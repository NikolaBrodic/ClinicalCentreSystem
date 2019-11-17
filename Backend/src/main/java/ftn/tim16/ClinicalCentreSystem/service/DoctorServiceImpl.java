package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    public Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator) {
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

        String hashedPassword = passwordEncoder.encode(generatePassword());
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

    public static String generatePassword() {
        int length = 12;

        final char[] lowercase = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        final char[] uppercase = "ABCDEFGJKLMNPRSTUVWXYZ".toCharArray();
        final char[] numbers = "0123456789".toCharArray();
        final char[] symbols = "$?!#&.".toCharArray();
        final char[] allAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGJKLMNPRSTUVWXYZ0123456789$?!#&.".toCharArray();

        Random random = new SecureRandom();

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length - 4; i++) {
            password.append(allAllowed[random.nextInt(allAllowed.length)]);
        }

        password.insert(random.nextInt(password.length()), lowercase[random.nextInt(lowercase.length)]);
        password.insert(random.nextInt(password.length()), uppercase[random.nextInt(uppercase.length)]);
        password.insert(random.nextInt(password.length()), numbers[random.nextInt(numbers.length)]);
        password.insert(random.nextInt(password.length()), symbols[random.nextInt(symbols.length)]);

        System.out.println(password.toString());
        return password.toString();
    }


}



