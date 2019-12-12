package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.Diagnose;

import java.util.List;

public interface DiagnoseService {

    List<Diagnose> findAll();

    Diagnose findByTitle(String title);

    Diagnose create(Diagnose diagnose);

}
