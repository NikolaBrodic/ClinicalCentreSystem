package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.common.RandomPasswordGenerator;
import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private ExaminationTypeService examinationTypeService;

    @Autowired
    private TimeOffDoctorService timeOffDoctorService;

    @Override
    public Doctor changePassword(String newPassword, Doctor user) {
        if (user.getStatus().equals(DoctorStatus.DELETED)) {
            return null;
        }
        user.setPassword(newPassword);
        if (user.getStatus().equals(DoctorStatus.NEVER_LOGGED_IN)) {
            user.setStatus(DoctorStatus.ACTIVE);
        }
        return doctorRepository.save(user);
    }

    @Override
    public boolean isAvailable(Doctor doctor, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        //TODO: CHECK VACATION
        if (!doctor.isAvailable(startDateTime.toLocalTime(), endDateTime.toLocalTime())) {
            return false;
        }
        if (timeOffDoctorService.isDoctorOnVacation(doctor.getId(), startDateTime, endDateTime)) {
            return false;
        }
        List<Examination> examinations = examinationService.getDoctorExaminations(doctor.getId());

        if (!examinations.isEmpty()) {
            for (Examination examination : examinations) {
                if (!examination.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public Doctor getAvailableDoctor(ExaminationType specialized, LocalDateTime startDateTime, LocalDateTime endDateTime, Long clinic_id) {
        List<Doctor> doctors = doctorRepository.findByClinicIdAndSpecializedAndStatusNot(clinic_id, specialized, DoctorStatus.DELETED);
        for (Doctor doctor : doctors) {
            if (isAvailable(doctor, startDateTime, endDateTime)) {
                return doctor;
            }
        }
        return null;
    }

    @Override
    public void removeExamination(Examination examination, String email) {
        Doctor doc = doctorRepository.findByEmail(email);
        doc.getExaminations().remove(examination);
        doctorRepository.save(doc);
    }

    @Override
    public Doctor getLoginDoctor() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        try {
            Doctor doctor = doctorRepository.findByEmail(currentUser.getName());
            if (doctor != null) {
                return doctor;
            }
        } catch (UsernameNotFoundException ex) {
            return null;
        }
        return null;
    }

    @Override
    public List<DoctorDTO> findByFirstNameAndLastNameAndDoctorRating(String firstName, String lastName, int doctorRating) {
        List<Doctor> listOfDoctors = doctorRepository.findByFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndDoctorRating(
                firstName, lastName, doctorRating);
        return convertToDTO(listOfDoctors);
    }

    private LocalDateTime getLocalDateTime(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(date, formatter);
    }

    @Override
    public List<DoctorDTO> getAllAvailableDoctors(Long specializedId, Long clinicId, String startDateTime, String endDateTime) {
        List<Doctor> doctors = doctorRepository.findByStatusNotAndClinicIdAndSpecializedId(DoctorStatus.DELETED, clinicId, specializedId);
        List<DoctorDTO> availableDoctors = new ArrayList<>();
        for (Doctor doctor : doctors) {
            if (isAvailable(doctor, getLocalDateTime(startDateTime), getLocalDateTime(endDateTime))) {
                availableDoctors.add(new DoctorDTO(doctor));
            }
        }
        return availableDoctors;
    }

    @Override
    public Doctor getDoctor(Long id) {
        return doctorRepository.findByIdAndStatusNot(id, DoctorStatus.DELETED);
    }

    @Override
    public Doctor deleteDoctor(Long clinic_id, Long id) {

        Doctor doctor = getDoctor(id);

        if (doctor.getClinic().getId() != clinic_id) {
            return null;
        }
        List<Examination> upcomingExaminations = examinationService.getDoctorsUpcomingExaminations(id);

        if (upcomingExaminations != null && !upcomingExaminations.isEmpty()) {
            return null;
        }
        doctor.setStatus(DoctorStatus.DELETED);
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator) throws DateTimeParseException {
        UserDetails userDetails = userService.findUserByEmail(doctor.getEmail());

        if (userDetails != null || doctorRepository.findByPhoneNumber(doctor.getPhoneNumber()) != null) {
            return null;
        }

        LocalTime workHoursFrom = LocalTime.parse(doctor.getWorkHoursFrom(), DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime workHoursTo = LocalTime.parse(doctor.getWorkHoursTo(), DateTimeFormatter.ofPattern("HH:mm"));
        ExaminationType examinationType = examinationTypeService.findById(doctor.getSpecialized().getId());
        if (workHoursFrom.isAfter(workHoursTo) || examinationType == null) {
            return null;
        }

        RandomPasswordGenerator randomPasswordGenerator = new RandomPasswordGenerator();
        String generatedPassword = randomPasswordGenerator.generatePassword();
        System.out.println(generatedPassword);
        String hashedPassword = passwordEncoder.encode(generatedPassword);

        Set<Authority> authorities = authenticationService.findByName("ROLE_DOCTOR");

        Doctor newDoctor = new Doctor(doctor.getEmail(), hashedPassword, doctor.getFirstName(),
                doctor.getLastName(), doctor.getPhoneNumber(), workHoursFrom, workHoursTo, clinicAdministrator.getClinic(),
                examinationType, DoctorStatus.NEVER_LOGGED_IN, authorities);

        return doctorRepository.save(newDoctor);
    }

    @Override
    public List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic) {
        return convertToDTO(doctorRepository.findByClinicIdAndStatusNot(clinic.getId(), DoctorStatus.DELETED));
    }

    private List<DoctorDTO> convertToDTO(List<Doctor> doctors) {
        List<DoctorDTO> doctorDTOS = new ArrayList<>();
        for (Doctor doctor : doctors) {
            doctorDTOS.add(new DoctorDTO(doctor));
        }
        return doctorDTOS;
    }

}



