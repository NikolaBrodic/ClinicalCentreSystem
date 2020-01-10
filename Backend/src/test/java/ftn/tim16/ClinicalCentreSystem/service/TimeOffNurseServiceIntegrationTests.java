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

import static ftn.tim16.ClinicalCentreSystem.constants.TimeOffNurseConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class TimeOffNurseServiceIntegrationTests {


    @Autowired
    private TimeOffNurseService timeOffNurseService;


    @Test
    public void testFindByNurseClinicIdAndStatus() {
        List<RequestForTimeOffDTO> timeOffDoctorResults = timeOffNurseService.getRequestsForHolidayOrTimeOff(ID);
        Assert.assertNotNull(timeOffDoctorResults);
        Assert.assertEquals(DB_SERVICE_AWAITING_COUNT, timeOffDoctorResults.size());
        for (RequestForTimeOffDTO requestForTimeOffDTO : timeOffDoctorResults) {
            Assert.assertEquals(AWAITING, requestForTimeOffDTO.getStatus());
        }
    }

    @Test
    public void testApproveRequestForHolidayOrTimeOff_timeOffNurse_doesNotExist() {
        Assert.assertNull(timeOffNurseService.approveRequestForHolidayOrTimeOff(APPROVED_TIME_OFF));
    }

    @Test
    @Sql(
            scripts = "classpath:update-data-h2.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD
    )
    public void testApproveRequestForHolidayOrTimeOff_success() {
        RequestForTimeOffDTO timeOffNurseResult = timeOffNurseService.approveRequestForHolidayOrTimeOff(AWAITING_TIME_OFF);
        assertNotNull(timeOffNurseResult);
        assertEquals(AWAITING_TIME_OFF, timeOffNurseResult.getId());
        assertEquals(APPROVED, timeOffNurseResult.getStatus());
    }

    @Test
    public void testRejectRequestForHolidayOrTimeOff_timeOffNurse_doesNotExist() {
        Assert.assertNull(timeOffNurseService.rejectRequestForHolidayOrTimeOff(APPROVED_TIME_OFF, REASON_FOR_REJECT));
    }

    @Test
    @Sql(
            scripts = "classpath:update-data-h2.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD
    )
    public void testRejectRequestForHolidayOrTimeOff_success() {
        RequestForTimeOffDTO timeOffNurseResult = timeOffNurseService.rejectRequestForHolidayOrTimeOff(AWAITING_TIME_OFF, REASON_FOR_REJECT);
        assertNotNull(timeOffNurseResult);
        assertEquals(AWAITING_TIME_OFF, timeOffNurseResult.getId());
        assertEquals(REJECTED, timeOffNurseResult.getStatus());
    }

    private Set<Authority> getAuthority(String role) {
        Authority authority = new Authority();
        authority.setName(role);
        Set<Authority> authorities = new HashSet<>();
        authorities.add(authority);

        return authorities;
    }

}
