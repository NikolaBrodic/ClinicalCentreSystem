package ftn.tim16.ClinicalCentreSystem.model;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "VARCHAR(50)",nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Doctor> doctors = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<ExaminationType> examinationTypes = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Room> rooms = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
