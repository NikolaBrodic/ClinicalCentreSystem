package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.response.RequestForTimeOff;
import ftn.tim16.ClinicalCentreSystem.dto.response.TimeOffDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.TimeOffDoctor;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffDoctorRepository;
import ftn.tim16.ClinicalCentreSystem.service.EmailNotificationService;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeOffDoctorServiceImpl implements TimeOffDoctorService {

    @Autowired
    private TimeOffDoctorRepository timeOffDoctorRepository;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Override
    public boolean isDoctorOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<TimeOffDoctor> timeOffDoctors = timeOffDoctorRepository.findByDoctorIdAndStatusNot(id, TimeOffStatus.REJECTED);
        if (!timeOffDoctors.isEmpty()) {
            for (TimeOffDoctor timeOffDoctor : timeOffDoctors) {
                if (!timeOffDoctor.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public List<TimeOffDTO> findByDoctorIdAndStatus(Long id, TimeOffStatus status) {
        return convertToDTO(timeOffDoctorRepository.findByDoctorIdAndStatus(id, status));
    }

    @Override
    public List<RequestForTimeOff> getRequestsForHolidayOrTimeOff(Long clinicId) {
        return convertRequestToDTO(timeOffDoctorRepository.findByDoctorClinicIdAndStatus(clinicId, TimeOffStatus.AWAITING));
    }

    @Override
    public RequestForTimeOff approveRequestForHolidayOrTimeOff(Long id) {
        TimeOffDoctor timeOffDoctor = timeOffDoctorRepository.findByIdAndStatus(id, TimeOffStatus.AWAITING);

        if (timeOffDoctor == null) {
            return null;
        }

        timeOffDoctor.setStatus(TimeOffStatus.APPROVED);

        TimeOffDoctor updatedTimeOff = timeOffDoctorRepository.save(timeOffDoctor);

        composeAndSendApprovalEmail(updatedTimeOff.getDoctor().getEmail(), updatedTimeOff.getType().toString());

        return new RequestForTimeOff(updatedTimeOff);
    }

    private void composeAndSendApprovalEmail(String recipientEmail, String type) {
        String subject = "Request for holiday/time off approved";
        StringBuilder sb = new StringBuilder();
        sb.append("Great news! Your request for ");
        sb.append(type.toLowerCase());
        sb.append(" is approved by a clinic administrator.");
        String text = sb.toString();

        emailNotificationService.sendEmail(recipientEmail, subject, text);
    }

    @Override
    public RequestForTimeOff rejectRequestForHolidayOrTimeOff(Long id, String reason) {
        TimeOffDoctor timeOffDoctor = timeOffDoctorRepository.findByIdAndStatus(id, TimeOffStatus.AWAITING);

        if (timeOffDoctor == null) {
            return null;
        }

        timeOffDoctor.setStatus(TimeOffStatus.REJECTED);
        TimeOffDoctor updatedTimeOff = timeOffDoctorRepository.save(timeOffDoctor);

        composeAndSendRejectionEmail(updatedTimeOff.getDoctor().getEmail(), updatedTimeOff.getType().toString(), reason);
        return new RequestForTimeOff(updatedTimeOff);
    }

    private void composeAndSendRejectionEmail(String recipientEmail, String type, String reason) {

        String subject = "Request for holiday/time off rejected ";
        StringBuilder sb = new StringBuilder();
        sb.append(" Your request for");
        sb.append(type.toLowerCase());
        sb.append(" is rejected by a clinic administrator.");
        sb.append("Explanation:");
        sb.append(System.lineSeparator());
        sb.append(reason);
        String text = sb.toString();

        emailNotificationService.sendEmail(recipientEmail, subject, text);
    }

    private List<TimeOffDTO> convertToDTO(List<TimeOffDoctor> timeOffDoctors) {
        if (timeOffDoctors == null || timeOffDoctors.isEmpty()) {
            return new ArrayList<>();
        }
        List<TimeOffDTO> timeOffDTOS = new ArrayList<>();
        for (TimeOffDoctor timeOffDoctor : timeOffDoctors) {
            timeOffDTOS.add(new TimeOffDTO(timeOffDoctor));
        }
        return timeOffDTOS;
    }

    private List<RequestForTimeOff> convertRequestToDTO(List<TimeOffDoctor> timeOffDoctors) {
        if (timeOffDoctors == null || timeOffDoctors.isEmpty()) {
            return new ArrayList<>();
        }
        List<RequestForTimeOff> timeOffDTOS = new ArrayList<>();
        for (TimeOffDoctor timeOffDoctor : timeOffDoctors) {
            timeOffDTOS.add(new RequestForTimeOff(timeOffDoctor));
        }
        return timeOffDTOS;
    }
}
