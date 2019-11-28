package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.DateTimeInterval;
import ftn.tim16.ClinicalCentreSystem.repository.DateTimeIntervalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DateTimeIntervalServiceImpl implements DateTimeIntervalService {

    @Autowired
    private DateTimeIntervalRepository dateTimeIntervalRepository;

    @Override
    public DateTimeInterval create(LocalDateTime startDate, LocalDateTime endDate) {
        if(!startDate.isBefore(endDate)){
            return null;
        }
        DateTimeInterval dateTimeInterval = new DateTimeInterval();
        dateTimeInterval.setStartDateTime(startDate);
        dateTimeInterval.setEndDateTime(endDate);
        return  dateTimeIntervalRepository.save(dateTimeInterval);
    }
}
