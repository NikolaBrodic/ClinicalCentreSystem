package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Diagnose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, columnDefinition = "VARCHAR(30)", nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "diagnose", fetch = FetchType.LAZY)
    private Set<ExaminationReport> examinationReports = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ExaminationReport> getExaminationReports() {
        return examinationReports;
    }

    public void setExaminationReports(Set<ExaminationReport> examinationReports) {
        this.examinationReports = examinationReports;
    }
}
