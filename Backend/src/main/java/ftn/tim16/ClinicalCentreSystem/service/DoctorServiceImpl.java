package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.common.RandomPasswordGenerator;
import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ExaminationService examinationService;

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
        if(!doctor.isAvailable(startDateTime.toLocalTime(),endDateTime.toLocalTime())){
            return false;
        }
        if(timeOffDoctorService.isDoctorOnVacation(doctor.getId(),startDateTime,endDateTime)){
            return false;
        }
        List<Examination> examinations = examinationService.getDoctorsExamination(doctor.getId());
        if(!examinations.isEmpty()){
            for(Examination examination : examinations){
                if(!examination.getInterval().isAvailable(startDateTime,endDateTime)){
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public Doctor getAvailableDoctor(ExaminationType specialized, LocalDateTime startDateTime, LocalDateTime endDateTime, Long clinic_id) {
        List<Doctor> doctors = doctorRepository.findByClinicIdAndSpecializedAndStatusNot(clinic_id,specialized,DoctorStatus.DELETED);
        for (Doctor doctor: doctors) {
            if(isAvailable(doctor,startDateTime,endDateTime)){
                return doctor;
            }
        }
        return null;
    }

    @Override
    public void removeExamination(Examination examination,String email) {
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
    public Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator) throws DateTimeParseException {
        UserDetails userDetails = userService.findUserByEmail(doctor.getEmail());
        if (userDetails != null) {
            return null;
        }
        if (doctorRepository.findByPhoneNumber(doctor.getPhoneNumber()) != null) {
            return null;
        }

        LocalTime workHoursFrom = LocalTime.parse(doctor.getWorkHoursFrom(), DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime workHoursTo = LocalTime.parse(doctor.getWorkHoursTo(), DateTimeFormatter.ofPattern("HH:mm"));
        if (workHoursFrom.isAfter(workHoursTo)) {
            return null;
        }
        ExaminationType examinationType = examinationTypeRepository.getById(doctor.getSpecialized().getId());
        if (examinationType == null) {
            return null;
        }

        RandomPasswordGenerator randomPasswordGenerator = new RandomPasswordGenerator();
        String generatedPassword = randomPasswordGenerator.generatePassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);
        
        List<Authority> authorities = authenticationService.findByName("ROLE_DOCTOR");

        Doctor newDoctor = new Doctor(doctor.getEmail(), hashedPassword, doctor.getFirstName(),
                doctor.getLastName(), doctor.getPhoneNumber(), workHoursFrom, workHoursTo, clinicAdministrator.getClinic(),
                examinationType, DoctorStatus.NEVER_LOGGED_IN, authorities);

        return doctorRepository.save(newDoctor);
    }

    @Override
    public List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic) {
        return convertToDTO(doctorRepository.findByClinicIdAndStatusNot(clinic.getId(), DoctorStatus.DELETED));
    }

    @Override
    public List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic, Pageable page) {
        return convertToDTO(doctorRepository.findByClinicIdAndStatusNot(clinic.getId(), DoctorStatus.DELETED, page));
    }

    private List<DoctorDTO> convertToDTO(List<Doctor> doctors) {
        List<DoctorDTO> doctorDTOS = new ArrayList<>();
        for (Doctor doctor : doctors) {
            doctorDTOS.add(new DoctorDTO(doctor));
        }
        return doctorDTOS;
    }

    private List<DoctorDTO> convertToDTO(Page<Doctor> doctors) {
        List<DoctorDTO> doctorDTOS = new ArrayList<>();
        for (Doctor doctor : doctors) {
            doctorDTOS.add(new DoctorDTO(doctor));
        }
        return doctorDTOS;
    }

}



