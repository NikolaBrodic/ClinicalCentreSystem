package ftn.tim16.ClinicalCentreSystem.model;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class ExaminationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,columnDefinition = "VARCHAR(30)", nullable = false)
    private String label;

    @Column(nullable = false,scale=2)
    private Double price;

    @OneToMany(mappedBy = "specialized", fetch = FetchType.LAZY)
    private Set<Doctor> doctors = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private Clinic clinic;

    @Enumerated(EnumType.STRING)
    private LogicalStatus status;

}
