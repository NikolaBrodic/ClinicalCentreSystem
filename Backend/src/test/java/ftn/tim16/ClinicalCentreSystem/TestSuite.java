package ftn.tim16.ClinicalCentreSystem;

import ftn.tim16.ClinicalCentreSystem.controller.PatientControllerIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.controller.PatientControllerUnitTests;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepositoryUnitTests;
import ftn.tim16.ClinicalCentreSystem.service.PatientServiceUnitTests;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        PatientRepositoryUnitTests.class,
        PatientServiceUnitTests.class,
        PatientControllerUnitTests.class,
        PatientControllerIntegrationTests.class
})
public class TestSuite {
}
