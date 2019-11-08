package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class DateTimeInterval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @OneToMany(mappedBy = "interval", fetch = FetchType.LAZY)
    private Set<TimeOffDoctor> timeOffDoctors = new HashSet<>();

    @OneToMany(mappedBy = "interval", fetch = FetchType.LAZY)
    private Set<Examination> examinations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }
}
