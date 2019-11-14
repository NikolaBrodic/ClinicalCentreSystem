package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Override
    public Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator) {
        if (doctorRepository.findByEmailIgnoringCase(doctor.getEmail()) != null) {
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
        Doctor newDoctor = new Doctor(doctor.getEmail(), generatePassword(9), doctor.getFirstName(),
                doctor.getLastName(), doctor.getPhoneNumber(), workHoursFrom, workHoursTo, clinicAdministrator.getClinic(),
                examinationType, DoctorStatus.NEVER_LOGGED_IN);
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

    private String generatePassword(int n) {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }
    @Override
    public Doctor changePassword(UserDTO userDTO, Doctor user) {
        if(user.getStatus().equals(DoctorStatus.DELETED)){
            return null;
        }
        user.setPassword(userDTO.getNewPassword());
        if(user.getStatus().equals(DoctorStatus.NEVER_LOGGED_IN)){
            user.setStatus(DoctorStatus.ACTIVE);
        }
        return doctorRepository.save(user);
    }
}
