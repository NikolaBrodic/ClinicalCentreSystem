package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;

import java.time.LocalDateTime;
import java.util.List;

public interface DoctorService {
    Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator);

    List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic);

    Doctor changePassword(String newPassword, Doctor user);

    boolean isAvailable(Doctor doctor, LocalDateTime startDateTime, LocalDateTime endDateTime);

    Doctor getAvailableDoctor(ExaminationType specialized, LocalDateTime startDateTime, LocalDateTime endDateTime, Long clinic_id);

    void removeExamination(Examination examination, String email);

    Doctor getLoginDoctor();

    List<DoctorDTO> findByFirstNameAndLastNameAndDoctorRating(String firstName, String lastName, int doctorRating);

    List<DoctorDTO> getAllAvailableDoctors(Long specializedId, Long clinicId, String startDateTime, String endDateTime);

    Doctor getDoctor(Long id);

    Doctor deleteDoctor(Long clinic_id, Long id);
}
