import { EditRoom } from './../models/editRoom';
import { AssignExaminationDTO } from './../models/assignexamination';
import { Examination } from './../models/examination';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Room } from './../models/room';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = environment.baseUrl + environment.room;

  roomsForAdmin: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  updateSuccessEmitter = new Subject<Room>();
  createSuccessEmitter = new Subject<Room>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(room: Room): any {
    return this.httpClient.post(this.url, room);
  }

  public edit(room: EditRoom): any {
    return this.httpClient.put(this.url, room);
  }

  public assignRoom(room: Room, examination: Examination, doctors: Doctor[]): any {
    return this.httpClient.put(this.url + "/assign", new AssignExaminationDTO(examination.id, room.label, room.kind, room.id, room.available.toString(), doctors));
  }

  public assignRoomWithDoctors(room: Room, examination: Examination, doctors: Doctor[]): any {
    return this.httpClient.put(this.url + "/assign", new AssignExaminationDTO(examination.id, room.label, room.kind, room.id, room.available.toString(), doctors));
  }

  public getAllRoomsForAdmin(): Observable<Room[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Room[]) => {
      this.roomsForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.roomsForAdmin.asObservable();
  }

  public getAvailableExaminationRooms(startDateTime: string, endDateTime: string): any {
    let params = new HttpParams();
    params = params.append('startDateTime', startDateTime);
    params = params.append('endDateTime', endDateTime);

    return this.httpClient.get(this.url + "/available-examination-rooms", {
      params: params
    });
  }

  public getRoomsForAdminPaging(pageIndex, pageSize, sort: MatSort, kind, search, searchDate, searchStartTime, searchEndTime): any {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active + "," + sort.direction);
      }

    }
    params = params.append('kind', kind);
    params = params.append('searchLabel', search);
    params = params.append('searchDate', searchDate);
    params = params.append('searchStartTime', searchStartTime);
    params = params.append('searchEndTime', searchEndTime);
    return this.httpClient.get(this.url + "/pageAll", {
      params: params
    });
  }


  public deleteRoom(id: number): any {
    return this.httpClient.delete(this.url + '/' + id);
  }

}
