package ftn.tim16.ClinicalCentreSystem.model;

import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import javax.persistence.*;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, columnDefinition = "VARCHAR(30)",nullable = false)
    private String label;

    @Enumerated(EnumType.STRING)
    private ExaminationKind kind;

    @ManyToOne(fetch = FetchType.EAGER)
    private Clinic clinic;

    @Enumerated(EnumType.STRING)
    private LogicalStatus status;
}
