import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';
import { AssignDoctorsComponent } from './../assign-doctors/assign-doctors.component';
import { element } from 'protractor';
import { MatPaginator } from '@angular/material/paginator';
import { Examination } from './../../models/examination';
import { ExaminationService } from './../../services/examination.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { RoomService } from './../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { Room } from './../../models/room';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsWithNumberOffItmes } from 'src/app/models/roomsWithNumberOffItmes';
import * as moment from 'moment';
import { ChooseDoctorComponent } from '../choose-doctor/choose-doctor.component';
@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {

  roomsDataSource: MatTableDataSource<Room>;
  displayedColumns: string[] = ['label', 'available', 'assign'];
  searchString: string;
  numberOfItem: number;
  searchLabel: string = "";
  searchDate: Date;
  kind: string;
  searchTimeStart: String;
  searchTimeEnd: String;
  minDate = new Date();
  examination: Examination;
  kinds: String[] = ["EXAMINATION", "OPERATION"];

  constructor(public dialog: MatDialog,
    private roomService: RoomService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private doctorService: DoctorService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      var param = params['kind'];
      if ("operation" === param) {
        this.kind = "OPERATION";
        this.examination = JSON.parse(localStorage.getItem('selectedExamination'));
        this.setDateTime();
      } else if ("examination" === param) {
        this.kind = "EXAMINATION";
        this.examination = JSON.parse(localStorage.getItem('selectedExamination'));
        this.setDateTime();
      } else {
        this.router.navigate(['/error']);
      }
    });

  }

  setDateTime() {
    if (!this.examination) {
      this.router.navigate(['/error']);
      return;
    }
    let dateFormat = "YYYY-MM-DD";
    this.searchDate = moment(this.examination.interval.startDateTime.toString().substr(0, 10), dateFormat).toDate();

    this.searchTimeStart = this.examination.interval.startDateTime.toString().substr(11);

    this.searchTimeEnd = this.examination.interval.endDateTime.toString().substr(11);

    this.getRoomsForAdminPaging(0);
  }

  sortEvent() {
    this.getRoomsForAdminPaging(0);
  }

  assignRoom(element: Room) {

    if (!this.examination) {
      this.toastr.error("You need to choose examination first", 'Assign room');
      this.router.navigate(['/clinical-centre-admin/examination/get-awaiting']);
    }

    if (element.available != this.examination.interval.startDateTime && this.examination.kind === 'EXAMINATION') {
      const format = 'yyyy-MM-dd HH:mm';
      const locale = 'en-US';

      const duration = moment.duration(moment(this.examination.interval.endDateTime, 'YYYY-MM-DD HH:mm')
        .diff(moment(this.examination.interval.startDateTime, 'YYYY-MM-DD HH:mm'))
      )
      const endDateTime = moment(element.available, 'YYYY-MM-DD HH:mm').add(duration).format('YYYY-MM-DD HH:mm');

      this.doctorService.isAvailable(this.examination.doctors[0].id, formatDate(element.available.toString(), format, locale),
        endDateTime).subscribe((responseData: Boolean) => {
          if (!responseData) {
            this.dialog.open(ChooseDoctorComponent, {
              data: {
                choosenRoom: element,
                choosenExamination: this.examination
              }
            });
          } else {
            this.assignRoomRequest(element);
          }
        },
          () => {
            this.toastr.error("Please choose valid start and end time.", 'Assign room');
          });

    } else {
      this.assignRoomRequest(element);
    }

  }

  assignRoomRequest(room: Room) {
    this.roomService.assignRoom(room, this.examination, this.examination.doctors).subscribe(
      () => {
        this.toastr.success("Successfully assigned examination room ", 'Assign room');
        this.router.navigate(['/clinic-admin/examination/get-awaiting']);
      },
      () => {
        this.toastr.error("You can not assign this room. Please choose another one.", 'Assign room');
      }
    );
  }

  chooseDoctors(element: Room) {
    if (!this.examination) {
      this.toastr.error("You need to choose examination first", 'Assign room');
      this.router.navigate(['/clinical-centre-admin/examination/awaiting-operations']);
    }

    this.dialog.open(AssignDoctorsComponent, {
      data: {
        choosenRoom: element,
        choosenExamination: this.examination
      }
    });
  }

  searchRooms() {
    this.getRoomsForAdminPaging(0);
  }

  getRoomsForAdminPaging(pageIndex: number) {

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    if (this.searchDate) {
      this.requestForGettingRooms(formatDate(this.searchDate, format, locale), pageIndex);

    } else {
      this.requestForGettingRooms(this.searchDate, pageIndex);
    }

  }

  requestForGettingRooms(date: any, pageIndex: number) {
    this.paginator.pageIndex = pageIndex;
    this.roomService.getRoomsForAdminPaging
      (pageIndex, 5, this.sort, this.kind, this.searchLabel, date, this.searchTimeStart, this.searchTimeEnd).
      subscribe((data: RoomsWithNumberOffItmes) => {
        this.numberOfItem = data.numberOfItems;
        this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
        this.roomsDataSource.sort = this.sort;
      })
  }

  changePage() {
    this.getRoomsForAdminPaging(this.paginator.pageIndex);
  }

}
