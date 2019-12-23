package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private ExaminationService examinationService;

    @Override
    public ClinicDTO findById(Long id) {
        Clinic clinic = clinicRepository.findOneById(id);
        if (clinic == null) {
            return null;
        }

        return new ClinicDTO(clinic);
    }

    @Override
    public Clinic findByName(String name) {
        return clinicRepository.findByNameIgnoringCase(name);
    }

    @Override
    public Clinic findByAddress(String address) {
        return clinicRepository.findByAddressIgnoringCase(address);
    }

    @Override
    public ClinicDTO create(ClinicDTO clinicDTO) {
        if (findByName(clinicDTO.getName()) != null || findByAddress(clinicDTO.getAddress()) != null) {
            return null;
        }

        Clinic clinic = new Clinic(clinicDTO.getName(), clinicDTO.getDescription(), clinicDTO.getAddress());

        return new ClinicDTO(clinicRepository.save(clinic));
    }

    @Override
    public List<ClinicDTO> findAll() {
        return convertToDTO(clinicRepository.findAll());
    }

    @Override
    public Integer getClinicRevenue(Long id, String startDateTime, String endDateTime) {
        LocalDateTime startDate = LocalDateTime.of(getDate(startDateTime.toString()), LocalTime.of(0, 0));

        LocalDateTime endDate = LocalDateTime.of(getDate(endDateTime.toString()), LocalTime.of(0, 0, 0));
        if (startDate.isAfter(endDate) || startDate.isAfter(LocalDateTime.now())) {
            return null;
        }

        List<Examination> examinations = examinationService.getClinicExaminations(id, startDate, endDate);
        Double revenue = 0.0;
        for (Examination examination : examinations) {
            if (examination.getDiscount() == null || examination.getDiscount() <= 0) {
                revenue += examination.getExaminationType().getPrice();
            } else {
                revenue += (examination.getExaminationType().getPrice() * (100 - examination.getDiscount()) / 100);
            }
        }
        return revenue.intValue();
    }

    private LocalDate getDate(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date.substring(0, 10), formatter);
    }

    private List<ClinicDTO> convertToDTO(List<Clinic> clinics) {
        if (clinics == null || clinics.isEmpty()) {
            return new ArrayList<>();
        }
        List<ClinicDTO> roomDTOS = new ArrayList<>();
        for (Clinic room : clinics) {
            roomDTOS.add(new ClinicDTO(room));
        }
        return roomDTOS;
    }
}
