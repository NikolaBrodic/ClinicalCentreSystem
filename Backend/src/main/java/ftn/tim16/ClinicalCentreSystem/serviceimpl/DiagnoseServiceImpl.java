package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.model.Diagnose;
import ftn.tim16.ClinicalCentreSystem.repository.DiagnoseRepository;
import ftn.tim16.ClinicalCentreSystem.service.DiagnoseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnoseServiceImpl implements DiagnoseService {

    @Autowired
    private DiagnoseRepository diagnoseRepository;

    @Override
    public List<Diagnose> findAll() {
        return diagnoseRepository.findAll();
    }

    @Override
    public Diagnose findByTitle(String title) {
        return diagnoseRepository.findByTitleIgnoringCase(title);
    }

    @Override
    public Diagnose create(Diagnose newDiagnose) {
        Diagnose diagnose = findByTitle(newDiagnose.getTitle());
        if (diagnose != null) {
            return null;
        }

        return diagnoseRepository.save(newDiagnose);
    }
}
