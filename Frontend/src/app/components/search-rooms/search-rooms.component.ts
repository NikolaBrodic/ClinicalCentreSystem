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

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {

  roomsDataSource: MatTableDataSource<Room>;
  displayedColumns: string[] = ['label', 'available', 'assign'];
  public searchString: string;
  numberOfItem: number;
  searchLabel: string = "";
  searchDate: Date;
  kind: string;
  searchTimeStart: String;
  searchTimeEnd: String;
  minDate = new Date();
  examination: Examination;
  private selectedExamination: Subscription;

  constructor(public dialog: MatDialog,
    private roomService: RoomService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private examinationService: ExaminationService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      var param = params['kind'];
      if ("operation" === param) {
        this.kind = "OPERATION";
        this.examination = this.examinationService.selectedExamination;
        this.setDateTime();
      } else if ("examination" === param) {
        this.kind = "EXAMINATION";
        this.examination = this.examinationService.selectedExamination;
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
    this.searchDate = new Date(formatDate(this.examination.interval.startDateTime.toString(), 'MM.dd.yyyy', 'en-US'));
    console.log(this.searchDate);
    this.searchTimeStart = formatDate(this.examination.interval.startDateTime.toString(), 'hh:mm', 'en-US');
    this.searchTimeEnd = formatDate(this.examination.interval.endDateTime.toString(), 'hh:mm', 'en-US');
    this.getRoomsForAdminPaging();
  }

  sortEvent() {
    this.getRoomsForAdminPaging();
  }

  assignRoom(element: Room) {

    if (!this.examination) {
      this.toastr.error("First you need to chose examination", 'Assign room');
      this.router.navigate(['/clinical-centre-admin/examination/get-awaiting']);
    }

    this.roomService.assignRoom(element, this.examination).subscribe(
      responseData => {
        this.toastr.success("Successfully assigned examination room ", 'Assign room');
      },
      message => {
        this.toastr.error("Error", 'Assign room');
      }
    );
  }

  searchRooms() {
    /*if (this.searchDate && (!this.searchTimeStart || !this.searchTimeEnd)) {
       this.toastr.error("You have to set start and end time", 'Search room');
       return;
     }
       if (this.searchTimeStart >= this.searchTimeEnd) {
         this.toastr.error("Starting time must be before ending time.", 'Search room');
         return;
       }*/

    this.getRoomsForAdminPaging();
  }

  getRoomsForAdminPaging() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    if (this.searchDate) {
      const formattedDate = formatDate(this.searchDate, format, locale);
      this.roomService.getRoomsForAdminPaging
        (this.paginator.pageIndex, 5, this.sort, this.kind, this.searchLabel, formattedDate, this.searchTimeStart, this.searchTimeEnd).
        subscribe((data: RoomsWithNumberOffItmes) => {
          this.numberOfItem = data.numberOfItems;
          this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
          this.roomsDataSource.sort = this.sort;
        })
    } else {
      this.roomService.getRoomsForAdminPaging
        (this.paginator.pageIndex, 5, this.sort, this.kind, this.searchLabel, this.searchDate, this.searchTimeStart, this.searchTimeEnd).
        subscribe((data: RoomsWithNumberOffItmes) => {
          this.numberOfItem = data.numberOfItems;
          this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
          this.roomsDataSource.sort = this.sort;
        })
    }

  }

  changePage() {
    this.getRoomsForAdminPaging();
  }

}
