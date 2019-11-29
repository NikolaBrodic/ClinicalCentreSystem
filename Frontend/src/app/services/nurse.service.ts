import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Nurse } from '../models/nurse';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  url = environment.baseUrl + environment.nurse;

  nursesInClinic: BehaviorSubject<Nurse[]> = new BehaviorSubject<Nurse[]>([]);
  addSuccessEmitter = new Subject<Nurse>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllNursesInClinic(pageIndex, pageSize, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active);
        params = params.append('direction', sort.direction);
      }
    }

    return this.httpClient.get(this.url + "/page-all", {
      params: params
    });
  }

  public add(nurse: Nurse) {
    return this.httpClient.post(this.url, nurse);
  }
}
