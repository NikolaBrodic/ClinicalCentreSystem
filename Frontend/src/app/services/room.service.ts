import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Room } from './../models/room';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = environment.baseUrl + environment.room;

  roomsForAdmin: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  updateSuccessEmitter = new Subject<Room>();
  createSuccessEmitter = new Subject<Room>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(room: Room) {
    return this.httpClient.post(this.url, room);
  }

  public getAllRoomsForAdmin(): Observable<Room[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Room[]) => {
      this.roomsForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.roomsForAdmin.asObservable();
  }

  public getRoomsForAdminPaging(pageIndex, pageSize, sort: MatSort, kind) {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active);
        params = params.append('direction', sort.direction);
      }

    }
    params = params.append('kind', kind);

    return this.httpClient.get(this.url + "/pageAll", {
      params: params
    });
  }

}
