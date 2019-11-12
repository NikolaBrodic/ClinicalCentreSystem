package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;

public interface DoctorService  {
    Doctor create(Doctor doctor, ClinicAdministrator clinicAdministrator);
}
