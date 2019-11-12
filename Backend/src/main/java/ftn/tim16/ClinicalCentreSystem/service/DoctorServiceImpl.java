package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.HashSet;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Override
    public Doctor create(Doctor doctor, ClinicAdministrator clinicAdministrator) {
        if(doctorRepository.findByEmailIgnoringCase(doctor.getEmail()) != null){
            return null;
        }
        if(doctorRepository.findByPhoneNumber(doctor.getPhoneNumber()) != null){
            return null;
        }
        if(doctor.getWorkHoursFrom().isAfter(doctor.getWorkHoursTo())) {
            return null;
        }
        ExaminationType examinationType = examinationTypeRepository.getById(doctor.getSpecialized().getId());
        if(examinationType == null){
            return null;
        }

        doctor.setPassword(generatePassword(9));
        doctor.setClinic(clinicAdministrator.getClinic());
        doctor.setSpecialized(examinationType);
        doctor.setStatus(DoctorStatus.NEVER_LOGGED_IN);
        doctor.setExaminations(new HashSet<Examination>());
        doctor.setTimeOffDoctors(new HashSet<TimeOffDoctor>());
        return doctorRepository.save(doctor);
    }

    public String generatePassword(int n){
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }
}
