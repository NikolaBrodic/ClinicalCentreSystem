package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.response.RequestForTimeOffDTO;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static ftn.tim16.ClinicalCentreSystem.constants.TimeOffDoctorConstants.*;
import static ftn.tim16.ClinicalCentreSystem.constants.TimeOffNurseConstants.AWAITING;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class TimeOffDoctorServiceIntegrationTests {
    @Autowired
    private TimeOffDoctorService timeOffDoctorService;

    @Test
    public void testFindByDoctorClinicIdAndStatus() {

        List<RequestForTimeOffDTO> timeOffDoctorResults = timeOffDoctorService.getRequestsForHolidayOrTimeOff(ID);
        Assert.assertNotNull(timeOffDoctorResults);
        Assert.assertEquals(DB_SERVICE_AWAITING_COUNT, timeOffDoctorResults.size());
        for (RequestForTimeOffDTO requestForTimeOffDTO : timeOffDoctorResults) {
            Assert.assertEquals(AWAITING, requestForTimeOffDTO.getStatus());
        }
    }

    @Test
    public void testApproveRequestForHolidayOrTimeOff_timeOffDoctor_doesNotExist() {
        Assert.assertNull(timeOffDoctorService.approveRequestForHolidayOrTimeOff(APPROVED_TIME_OFF));
    }

    @Test
    @Sql(
            scripts = "classpath:update-data-h2.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD
    )
    public void testApproveRequestForHolidayOrTimeOff_success() {
        RequestForTimeOffDTO timeOffDoctorResult = timeOffDoctorService.approveRequestForHolidayOrTimeOff(AWAITING_TIME_OFF);
        assertNotNull(timeOffDoctorResult);
        assertEquals(AWAITING_TIME_OFF, timeOffDoctorResult.getId());
        assertEquals(APPROVED, timeOffDoctorResult.getStatus());
    }

    @Test
    public void testRejectRequestForHolidayOrTimeOff_timeOffDoctor_doesNotExist() {
        Assert.assertNull(timeOffDoctorService.rejectRequestForHolidayOrTimeOff(APPROVED_TIME_OFF, REASON_FOR_REJECT));
    }

    @Test
    @Sql(
            scripts = "classpath:update-data-h2.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD
    )
    public void testRejectRequestForHolidayOrTimeOff_success() {
        RequestForTimeOffDTO timeOffDoctorResult = timeOffDoctorService.rejectRequestForHolidayOrTimeOff(AWAITING_TIME_OFF, REASON_FOR_REJECT);

        assertNotNull(timeOffDoctorResult);
        assertEquals(AWAITING_TIME_OFF, timeOffDoctorResult.getId());
        assertEquals(REJECTED, timeOffDoctorResult.getStatus());
    }

    private Set<Authority> getAuthority(String role) {
        Authority authority = new Authority();
        authority.setName(role);
        Set<Authority> authorities = new HashSet<>();
        authorities.add(authority);

        return authorities;
    }

}
