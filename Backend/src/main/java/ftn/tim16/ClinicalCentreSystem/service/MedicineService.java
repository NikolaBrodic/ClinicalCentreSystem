package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.Medicine;

import java.util.List;

public interface MedicineService {

    List<Medicine> findAll();

    Medicine findByLabel(String label);

    Medicine create(Medicine medicine);
}
