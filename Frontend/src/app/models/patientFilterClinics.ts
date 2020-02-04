import { DateTime } from 'luxon';

export class PatientFilterClinics {

  constructor(
    public examinationDate: DateTime,
    public examinationType: String,
    public clinicAddress: String,
    public clinicMinRating: Number,
    public examinationMaxPrice: Number,
  ) { }
  
}