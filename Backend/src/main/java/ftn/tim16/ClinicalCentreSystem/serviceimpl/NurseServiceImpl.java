package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.common.RandomPasswordGenerator;
import ftn.tim16.ClinicalCentreSystem.dto.EditNurseDTO;
import ftn.tim16.ClinicalCentreSystem.dto.NurseDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.repository.NurseRepository;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class NurseServiceImpl implements NurseService {
    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private TimeOffNurseService timeOffNurseService;

    public Nurse changePassword(String newPassword, Nurse user) {
        user.setPassword(newPassword);
        if (user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)) {
            user.setStatus(UserStatus.ACTIVE);
        }
        return nurseRepository.save(user);
    }

    @Override
    public List<NurseDTO> getAllNursesInClinic(Long id) {
        return convertToDTO(nurseRepository.findAllByClinicId(id));
    }

    @Override
    public List<NurseDTO> getAllNursesInClinic(Long id, Pageable page) {
        return convertToDTO(nurseRepository.findAllByClinicId(id, page));
    }

    @Override
    public Nurse create(NurseDTO nurseDTO, ClinicAdministrator clinicAdministrator) {
        UserDetails userDetails = userService.findUserByEmail(nurseDTO.getEmail());
        if (userDetails != null) {
            return null;
        }

        if (nurseRepository.findByPhoneNumber(nurseDTO.getPhoneNumber()) != null) {
            return null;
        }

        LocalTime workHoursFrom = LocalTime.parse(nurseDTO.getWorkHoursFrom(), DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime workHoursTo = LocalTime.parse(nurseDTO.getWorkHoursTo(), DateTimeFormatter.ofPattern("HH:mm"));
        if (workHoursFrom.isAfter(workHoursTo)) {
            return null;
        }

        RandomPasswordGenerator randomPasswordGenerator = new RandomPasswordGenerator();
        String generatedPassword = randomPasswordGenerator.generatePassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);

        Set<Authority> authorities = authenticationService.findByName("ROLE_NURSE");

        Nurse newNurse = new Nurse(nurseDTO.getEmail(), hashedPassword, nurseDTO.getFirstName(), nurseDTO.getLastName(),
                nurseDTO.getPhoneNumber(), workHoursFrom, workHoursTo, clinicAdministrator.getClinic(), authorities);

        Nurse nurse = nurseRepository.save(newNurse);

        composeAndSendEmail(nurse.getEmail(), clinicAdministrator.getClinic().getName(), generatedPassword);

        return nurse;
    }

    private void composeAndSendEmail(String recipientEmail, String clinicName, String generatedPassword) {
        String subject = "New position: Nurse";
        StringBuilder sb = new StringBuilder();
        sb.append("You have been registered as a nurse of a ");
        sb.append(clinicName);
        sb.append(" Clinic. From now on, you are in charge of stamping prescriptions to patients and helping doctors on examinations.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can login to the Clinical Centre System web site using your email address and the following password:");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("     ");
        sb.append(generatedPassword);
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("Because of the security protocol, you will have to change this given password the first time you log in.");
        String text = sb.toString();

        emailNotificationService.sendEmail(recipientEmail, subject, text);
    }

    private List<NurseDTO> convertToDTO(List<Nurse> nurses) {
        List<NurseDTO> nursesDTO = new ArrayList<>();
        for (Nurse nurse : nurses) {
            nursesDTO.add(new NurseDTO(nurse));
        }

        return nursesDTO;
    }

    private List<NurseDTO> convertToDTO(Page<Nurse> nurses) {
        List<NurseDTO> nursesDTO = new ArrayList<>();
        for (Nurse nurse : nurses) {
            nursesDTO.add(new NurseDTO(nurse));
        }

        return nursesDTO;
    }

    public Nurse getRandomNurse(Long clinic_id, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<Nurse> nurses = getAvailable(clinic_id, startDateTime, endDateTime);
        if (nurses.isEmpty()) {
            return null;
        }
        return nurses.get(new Random().nextInt(nurses.size()));
    }

    @Override
    public Nurse getLoginNurse() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        try {
            Nurse nurse = nurseRepository.findByEmail(currentUser.getName());
            if (nurse != null) {
                return nurse;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return null;
    }

    @Override
    public Nurse editPersonalInformation(EditNurseDTO editNurseDTO) {
        Nurse nurse = getLoginNurse();

        if (nurse.getId() != editNurseDTO.getId()) {
            return null;
        }

        LocalTime workHoursFrom = LocalTime.parse(editNurseDTO.getWorkHoursFrom(), DateTimeFormatter.ofPattern("HH:mm"));
        LocalTime workHoursTo = LocalTime.parse(editNurseDTO.getWorkHoursTo(), DateTimeFormatter.ofPattern("HH:mm"));
        if (workHoursFrom.isAfter(workHoursTo)) {
            return null;
        }

        if (!workHoursFrom.equals(nurse.getWorkHoursFrom()) || !workHoursTo.equals(nurse.getWorkHoursTo())) {
            if (!isEditable(editNurseDTO.getId())) {
                return null;
            }
            nurse.setWorkHoursFrom(workHoursFrom);
            nurse.setWorkHoursTo(workHoursTo);
        }

        nurse.setFirstName(editNurseDTO.getFirstName());
        nurse.setLastName(editNurseDTO.getLastName());
        nurse.setPhoneNumber(editNurseDTO.getPhoneNumber());
        return nurseRepository.save(nurse);
    }

    private boolean isEditable(Long nurseId) {
        List<Examination> upcomingExaminations = examinationService.getNurseUpcomingExaminations(nurseId);

        if (upcomingExaminations != null && !upcomingExaminations.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public EditNurseDTO findNurseById(Long id) {
        return new EditNurseDTO(nurseRepository.findByIdAndStatus(id, UserStatus.ACTIVE));
    }

    private List<Nurse> getAvailable(Long clinic_id, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<Nurse> nurses = nurseRepository.findByClinicId(clinic_id);
        List<Nurse> availableNurses = new ArrayList<>();
        for (Nurse nurse : nurses) {
            if (isAvailable(nurse.getId(), startDateTime, endDateTime)) {
                availableNurses.add(nurse);
            }
        }
        return availableNurses;
    }

    private boolean isAvailable(Long nurseId, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        Nurse nurse = nurseRepository.getById(nurseId);
        if (!nurse.isAvailable(startDateTime.toLocalTime(), endDateTime.toLocalTime())) {
            return false;
        }

        if (timeOffNurseService.isNurseOnVacation(nurseId, startDateTime, endDateTime)) {
            return false;
        }
        List<Examination> examinations = examinationService.getNurseExaminations(nurseId);
        if (!examinations.isEmpty()) {
            for (Examination examination : examinations) {
                if (!examination.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return false;
                }
            }
        }
        return true;
    }
}
