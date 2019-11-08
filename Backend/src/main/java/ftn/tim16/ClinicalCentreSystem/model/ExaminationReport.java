package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ExaminationReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime timeCreated;

    @Column(nullable = false)
    private String comment;

    @ManyToOne(fetch = FetchType.EAGER)
    private MedicalRecord medicalRecord;


}
