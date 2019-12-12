package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.model.Medicine;
import ftn.tim16.ClinicalCentreSystem.repository.MedicineRepository;
import ftn.tim16.ClinicalCentreSystem.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine findByLabel(String label) {
        return medicineRepository.findByLabelIgnoringCase(label);
    }

    @Override
    public Medicine create(Medicine newMedicine) {
        Medicine medicine = findByLabel(newMedicine.getLabel());
        if (medicine != null) {
            return null;
        }

        return medicineRepository.save(newMedicine);
    }
}
