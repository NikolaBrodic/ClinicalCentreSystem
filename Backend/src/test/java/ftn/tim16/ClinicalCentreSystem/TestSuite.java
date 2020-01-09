package ftn.tim16.ClinicalCentreSystem;

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
        TimeOffNurseServiceUnitTests.class
})
public class TestSuite {
}
