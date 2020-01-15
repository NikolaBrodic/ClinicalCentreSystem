package ftn.tim16.ClinicalCentreSystem;

import ftn.tim16.ClinicalCentreSystem.controller.TimeOffDoctorControllerIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.controller.TimeOffDoctorControllerUnitTests;
import ftn.tim16.ClinicalCentreSystem.controller.TimeOffNurseControllerUnitTests;
import ftn.tim16.ClinicalCentreSystem.controller.TimeOffNurseControllerntegrationTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffDoctorRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffNurseRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorServiceUnitTests;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffNurseServiceUnitTests;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        TimeOffDoctorRepositoryUnitTests.class,
        TimeOffNurseRepositoryUnitTests.class,
        TimeOffDoctorServiceUnitTests.class,
        TimeOffNurseServiceUnitTests.class,
        TimeOffDoctorControllerUnitTests.class,
        TimeOffNurseControllerUnitTests.class,
        TimeOffDoctorControllerIntegrationTests.class,
        TimeOffNurseControllerntegrationTests.class
})
public class TestSuite {
}
