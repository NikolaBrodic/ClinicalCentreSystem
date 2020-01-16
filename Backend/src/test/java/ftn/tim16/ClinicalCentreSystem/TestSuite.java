package ftn.tim16.ClinicalCentreSystem;

import ftn.tim16.ClinicalCentreSystem.controller.*;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffDoctorRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffNurseRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.service.PatientServiceUnitTests;
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
        TimeOffNurseControllerntegrationTests.class,
        PatientRepositoryUnitTests.class,
        PatientServiceUnitTests.class,
        PatientControllerUnitTests.class,
        PatientControllerIntegrationTests.class,
        RoomControllerUnitTests.class,
        RoomControllerIntegrationTests.class
})
public class TestSuite {
}
