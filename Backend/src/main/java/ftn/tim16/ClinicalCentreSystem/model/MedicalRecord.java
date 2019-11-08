package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private Integer height;

    @Column()
    private Integer weight;

    @Column(columnDefinition = "VARCHAR(3)")
    private String bloodType;

    @Column()
    private String alergies;

    @OneToMany(mappedBy = "medicalRecord", fetch = FetchType.LAZY)
    private Set<ExaminationReport> examinationReports = new HashSet<>();

}
