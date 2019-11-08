package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;

@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, columnDefinition = "VARCHAR(30)", nullable = false)
    private String label;

    @Column(nullable = false)
    private String chemicalComposition;

    @Column(nullable = false)
    private String usage;
}
