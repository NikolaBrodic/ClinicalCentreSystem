package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;

@Entity
public class Diagnose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, columnDefinition = "VARCHAR(30)", nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;


}
