package ftn.tim16.ClinicalCentreSystem.dto.response;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.MedicineDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.model.Prescription;

public class PrescriptionDTO {
    private Long id;

    private MedicineDTO medicine;

    private DoctorDTO doctor;

    private PatientDTO patient;

    public PrescriptionDTO() {
    }

    public PrescriptionDTO(Long id, MedicineDTO medicine, DoctorDTO doctor, PatientDTO patient) {
        this.id = id;
        this.medicine = medicine;
        this.doctor = doctor;
        this.patient = patient;
    }

    public PrescriptionDTO(Prescription prescription) {
        this(prescription.getId(), new MedicineDTO(prescription.getMedicine()), new DoctorDTO(prescription.getExaminationReport().getDoctor()),
                new PatientDTO(prescription.getExaminationReport().getExamination().getPatient()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedicineDTO getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineDTO medicine) {
        this.medicine = medicine;
    }

    public DoctorDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorDTO doctor) {
        this.doctor = doctor;
    }

    public PatientDTO getPatient() {
        return patient;
    }

    public void setPatient(PatientDTO patient) {
        this.patient = patient;
    }
}
