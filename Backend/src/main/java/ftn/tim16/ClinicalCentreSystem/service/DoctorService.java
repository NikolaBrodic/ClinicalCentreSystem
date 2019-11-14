package ftn.tim16.ClinicalCentreSystem.service;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DoctorService  {
    Doctor create(CreateDoctorDTO doctor, ClinicAdministrator clinicAdministrator);
    List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic);
    List<DoctorDTO> findAllDoctorsInClinic(Clinic clinic,Pageable page);
   Doctor changePassword(UserDTO userDTO, Doctor user);
}
