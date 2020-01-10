package ftn.tim16.ClinicalCentreSystem;

import ftn.tim16.ClinicalCentreSystem.controller.TimeOffDoctorControllerIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.controller.TimeOffNurseControllerntegrationTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffDoctorRepositoryIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffNurseRepositoryIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorServiceIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorServiceUnitTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffNurseServiceIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffNurseServiceUnitTests;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        TimeOffDoctorRepositoryIntegrationTests.class,
        TimeOffNurseRepositoryIntegrationTests.class,
        TimeOffDoctorServiceUnitTests.class,
        TimeOffNurseServiceUnitTests.class,
        TimeOffDoctorServiceIntegrationTests.class,
        TimeOffNurseServiceIntegrationTests.class,
        TimeOffDoctorControllerIntegrationTests.class,
        TimeOffNurseControllerntegrationTests.class
})
public class TestSuite {
}
