package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.request.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientWithIdDTO;
import ftn.tim16.ClinicalCentreSystem.dto.response.PatientPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.MedicalRecordRepository;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.service.EmailNotificationService;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.OptimisticLockException;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private ApplicationContext appContext;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Map<Long, Patient> patientCache = new HashMap<>();

    @Override
    @Transactional(readOnly = false)
    public Patient changePassword(String newPassword, Patient user) {
        if (user.getStatus().equals(PatientStatus.AWAITING_APPROVAL)) {
            return null;
        }
        user.setPassword(newPassword);
        Patient updatedPatient = patientRepository.save(user);
        patientCache.put(updatedPatient.getId(), updatedPatient);
        return updatedPatient;
    }

    @Override
    public List<AwaitingApprovalPatientDTO> findByStatus(PatientStatus patientStatus) {
        List<Patient> patients = patientRepository.findByStatus(patientStatus);
        List<AwaitingApprovalPatientDTO> patientsDTO = new ArrayList<AwaitingApprovalPatientDTO>();
        for (Patient patient : patients) {
            patientsDTO.add(convertToDTO(patient));
        }

        return patientsDTO;
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    public PatientWithIdDTO approveRequestToRegister(Long id) throws OptimisticLockException {
        Patient patient = patientRepository.findByIdAndStatus(id, PatientStatus.AWAITING_APPROVAL);
        if (patient == null) {
            return null;
        }

        patient.setStatus(PatientStatus.APPROVED);

        Patient updatedPatient = patientRepository.saveAndFlush(patient);
        if (updatedPatient == null) {
            return null;
        }

        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(updatedPatient);
        medicalRecordRepository.save(medicalRecord);

        patientCache.put(updatedPatient.getId(), updatedPatient);
        composeAndSendApprovalEmail(updatedPatient.getEmail());
        return new PatientWithIdDTO(updatedPatient);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    public boolean rejectRequestToRegister(Long id, String reason) throws OptimisticLockException {
        Patient patient = patientRepository.findByIdAndStatus(id, PatientStatus.AWAITING_APPROVAL);
        if (patient == null) {
            return false;
        } else if (patient.getStatus() == PatientStatus.APPROVED) {
            return false;
        }

        patientRepository.deleteById(id);
        composeAndSendRejectionEmail(patient.getEmail(), reason);
        return true;
    }

    private void composeAndSendApprovalEmail(String recipientEmail) {
        String subject = "Request to register approved";
        StringBuilder sb = new StringBuilder();
        sb.append("Great news! Your request to register as a patient is approved by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can now login to the Clinical Centre System and start using it.");
        String text = sb.toString();

        emailNotificationService.sendEmail(recipientEmail, subject, text);
    }

    private void composeAndSendRejectionEmail(String recipientEmail, String reason) {
        String subject = "Request to register rejected";
        StringBuilder sb = new StringBuilder();
        sb.append("Your request to register as a patient is rejected by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("Explanation:");
        sb.append(System.lineSeparator());
        sb.append(reason);
        String text = sb.toString();

        emailNotificationService.sendEmail(recipientEmail, subject, text);
    }

    @Override
    public PatientPagingDTO getPatientsForMedicalStaffPaging(Long clinicId, String firstName, String lastName, String healthInsuranceId, Pageable page) {
        try {
            Collection<ExaminationStatus> statuses = new ArrayList<>();
            statuses.add(ExaminationStatus.APPROVED);
            statuses.add(ExaminationStatus.PREDEF_BOOKED);
            Page<Patient> patients = patientRepository.findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatusIn(
                    clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, statuses, page);
            List<Patient> allPatients = patientRepository.findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatusIn(
                    clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, statuses);
            return new PatientPagingDTO(convertToDTO(patients.getContent()), allPatients.size());
        } catch (Error e) {
            return null;
        }

    }

    @Override
    public Patient getLoginPatient() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        try {
            Patient patient = patientRepository.findByEmail(currentUser.getName());
            if (patient != null) {
                return patient;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return null;
    }

    @Override
    public PatientWithIdDTO getPatientForMedicalStaff(Long id) {
        return new PatientWithIdDTO(get(id));
    }

    public Patient get(Long patientId) {
        /*
        if patient is not cached, fetch patient from database
        and cache fetched patient
         */
        patientCache.computeIfAbsent(patientId, s -> {
            return patientRepository.findByIdAndStatus(patientId, PatientStatus.APPROVED);
        });
        // return cloned patient
        return (Patient) appContext.getBean(patientCache.get(patientId).getPrototypeBeanName(), patientCache.get(patientId));
    }

    @Override
    public Patient getPatient(Long id) {
        return patientRepository.findByIdAndStatus(id, PatientStatus.APPROVED);
    }

    @Override
    public PatientDTO create(PatientDTO patientDTO, Set<Authority> authorities) {
        if (patientRepository.findByHealthInsuranceId(patientDTO.getHealthInsuranceID()) != null) {
            return null;
        }

        if (patientRepository.findByPhoneNumber(patientDTO.getPhoneNumber()) != null) {
            return null;
        }

        String hashedPassword = passwordEncoder.encode(patientDTO.getPassword());

        Patient newPatient = new Patient(patientDTO.getEmail(), hashedPassword, patientDTO.getFirstName(),
                patientDTO.getLastName(), patientDTO.getPhoneNumber(), patientDTO.getAddress(), patientDTO.getCity(),
                patientDTO.getCountry(), patientDTO.getHealthInsuranceID(), authorities);

        return new PatientDTO(patientRepository.save(newPatient));
    }

    @Override
    public Patient findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    @Override
    public Patient findByPhoneNumber(String phoneNumber) {
        return patientRepository.findByPhoneNumber(phoneNumber);
    }

    private List<PatientWithIdDTO> convertToDTO(List<Patient> patients) {
        if (patients == null || patients.isEmpty()) {
            return new ArrayList<>();
        }
        List<PatientWithIdDTO> patientWithIdDTOS = new ArrayList<>();
        for (Patient patient : patients) {
            patientWithIdDTOS.add(new PatientWithIdDTO(patient));
        }
        return patientWithIdDTOS;
    }

    private AwaitingApprovalPatientDTO convertToDTO(Patient patient) {
        AwaitingApprovalPatientDTO awaitingApprovalPatientDTO = new AwaitingApprovalPatientDTO();
        awaitingApprovalPatientDTO.setId(patient.getId());
        awaitingApprovalPatientDTO.setFirstName(patient.getFirstName());
        awaitingApprovalPatientDTO.setLastName(patient.getLastName());
        awaitingApprovalPatientDTO.setEmail((patient.getEmail()));

        return awaitingApprovalPatientDTO;
    }
}
