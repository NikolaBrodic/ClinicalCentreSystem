import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  url = environment.baseUrl + environment.medicine;

  medicines: BehaviorSubject<Medicine[]> = new BehaviorSubject<Medicine[]>([]);
  addSuccessEmitter = new Subject<Medicine>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllMedicines(): Observable<Medicine[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Medicine[]) => {
      this.medicines.next(data)
    },
      (error: HttpErrorResponse) => {

      });
    return this.medicines.asObservable();
  }

}
