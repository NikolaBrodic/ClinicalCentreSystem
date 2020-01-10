package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.request.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientWithIdDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static ftn.tim16.ClinicalCentreSystem.constants.PatientConstants.*;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class PatientServiceIntegrationTests {

    @Autowired
    private PatientService patientService;

    @Test
    public void testFindByStatus() {
        List<AwaitingApprovalPatientDTO> patientsResult = patientService.findByStatus(PATIENT_STATUS_AWAITING_APPROVAL);

        assertEquals(DB_AWAITING_APPROVAL_COUNT, patientsResult.size());
        for (int i = 0; i < DB_AWAITING_APPROVAL_COUNT; i++) {
            assertEquals(PATIENT_STATUS_AWAITING_APPROVAL, patientsResult.get(i).getStatus());
        }
    }

    @Test
    @Sql(scripts = "classpath:update-data-h2.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testApproveRequestToRegister_Success() {
        PatientWithIdDTO patientDTOResult = patientService.approveRequestToRegister(PATIENT_ID);

        assertEquals(PATIENT_ID, patientDTOResult.getId());
        assertEquals(PatientStatus.APPROVED, patientDTOResult.getStatus());
    }

    @Test
    public void testApproveRequestToRegister_PatientNotFound() {
        PatientWithIdDTO patientDTOResult = patientService.approveRequestToRegister(ACTIVATED_PATIENT_ID);

        assertNull(patientDTOResult);
    }

    @Test
    @Sql(scripts = "classpath:insert-data-h2.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testRejectRequestToRegister_Success() {
        boolean isDeletedResult = patientService.rejectRequestToRegister(PATIENT_ID, REASON_FOR_REJECTION);

        assertTrue(isDeletedResult);
    }

    @Test
    public void testRejectRequestToRegister_PatientNotFound() {
        boolean isDeletedResult = patientService.rejectRequestToRegister(ACTIVATED_PATIENT_ID, REASON_FOR_REJECTION);

        assertFalse(isDeletedResult);
    }
}
