package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.DiagnoseDTO;
import ftn.tim16.ClinicalCentreSystem.model.Diagnose;
import ftn.tim16.ClinicalCentreSystem.repository.DiagnoseRepository;
import ftn.tim16.ClinicalCentreSystem.service.DiagnoseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DiagnoseServiceImpl implements DiagnoseService {

    @Autowired
    private DiagnoseRepository diagnoseRepository;

    @Override
    public List<DiagnoseDTO> findAll() {
        return convertToDTO(diagnoseRepository.findAll());
    }

    @Override
    public Diagnose findByTitle(String title) {
        return diagnoseRepository.findByTitleIgnoringCase(title);
    }

    @Override
    public DiagnoseDTO create(DiagnoseDTO diagnose) {
        Diagnose diagnoseWithSameLabel = findByTitle(diagnose.getTitle());
        if (diagnoseWithSameLabel != null) {
            return null;
        }
        Diagnose newDiagnose = new Diagnose(diagnose.getTitle(), diagnose.getDescription());
        return new DiagnoseDTO(diagnoseRepository.save(newDiagnose));
    }

    private List<DiagnoseDTO> convertToDTO(List<Diagnose> diagnoses) {
        if (diagnoses == null || diagnoses.isEmpty()) {
            return new ArrayList<>();
        }
        List<DiagnoseDTO> diagnoseDTOS = new ArrayList<>();
        for (Diagnose diagnose : diagnoses) {
            diagnoseDTOS.add(new DiagnoseDTO(diagnose));
        }
        return diagnoseDTOS;
    }
}
