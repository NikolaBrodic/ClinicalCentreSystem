package ftn.tim16.ClinicalCentreSystem.service;
import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import org.springframework.data.domain.Pageable;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface DoctorService  {
    Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator);
    List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic);
    List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic,Pageable page);
    Doctor changePassword(String newPassword, Doctor user);
    boolean isAvailable(Doctor doctor, LocalDateTime startDateTime, LocalDateTime endDateTime);

    Doctor getAvailableDoctor(ExaminationType specialized,  LocalDateTime startDateTime, LocalDateTime endDateTime,Long clinic_id);

    void removeExamination(Examination examination,String email);

    Doctor getLoginDoctor();
}
