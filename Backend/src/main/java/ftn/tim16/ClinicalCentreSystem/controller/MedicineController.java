package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.model.Medicine;
import ftn.tim16.ClinicalCentreSystem.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/medicine", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine createdMedicine = medicineService.create(medicine);
        if (createdMedicine == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdMedicine, HttpStatus.CREATED);
    }

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return new ResponseEntity<>(medicineService.findAll(), HttpStatus.OK);
    }

}
