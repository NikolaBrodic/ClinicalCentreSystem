package ftn.tim16.ClinicalCentreSystem;

import ftn.tim16.ClinicalCentreSystem.controller.PatientControllerIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepositoryIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.service.PatientServiceIntegrationTests;
import ftn.tim16.ClinicalCentreSystem.service.PatientServiceUnitTests;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        PatientRepositoryIntegrationTests.class, PatientServiceUnitTests.class, PatientServiceIntegrationTests.class, PatientControllerIntegrationTests.class
})
public class TestSuite {
}
