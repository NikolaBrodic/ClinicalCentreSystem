import { ToastrService } from 'ngx-toastr';
import { Time, formatDate } from '@angular/common';
import { RoomWithNumber } from './../../models/roomWithNumber';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoomService } from './../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { Room } from './../../models/room';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {

  roomsDataSource: MatTableDataSource<Room>;
  displayedColumns: string[] = ['label', 'assign'];
  public searchString: string;
  numberOfItem: number;
  searchLabel: string = "";
  searchDate: Date;
  kind: string;
  searchTimeStart: Time;
  searchTimeEnd: Time;
  minDate = new Date();
  constructor(public dialog: MatDialog,
    private roomService: RoomService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    //TODO: QUERY-> PARAM
    this.route.queryParams.subscribe(params => {
      var param = params['kind'];
      if ("operation" === param) {
        this.kind = "OPERATION";
        this.getRoomsForAdminPaging();
      } else if ("examination" === param) {
        this.kind = "EXAMINATION";
        this.getRoomsForAdminPaging();
      } else {
        this.router.navigate(['/error']);
      }
    });

  }
  //TODO: Implement sort - it is not required
  sortEvent() {
    this.getRoomsForAdminPaging();
  }

  assignRoom() {

  }

  seacrhRooms() {
    if (this.searchDate && (!this.searchTimeStart || !this.searchTimeEnd)) {
      this.toastr.error("You have to set start and end time", 'Search room');
      return;
    }
    if (this.searchTimeStart >= this.searchTimeEnd) {
      this.toastr.error("Starting time must be before ending time.", 'Search room');
      return;
    }

    this.getRoomsForAdminPaging();
  }

  getRoomsForAdminPaging() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    if (this.searchDate) {
      const formattedDate = formatDate(this.searchDate, format, locale);
      this.roomService.getRoomsForAdminPaging
        (this.paginator.pageIndex, 5, this.sort, this.kind, this.searchLabel, formattedDate, this.searchTimeStart, this.searchTimeEnd).
        subscribe((data: RoomWithNumber) => {
          this.numberOfItem = data.numberOfItems;
          this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
          this.roomsDataSource.sort = this.sort;
        })
    } else {
      this.roomService.getRoomsForAdminPaging
        (this.paginator.pageIndex, 5, this.sort, this.kind, this.searchLabel, this.searchDate, this.searchTimeStart, this.searchTimeEnd).
        subscribe((data: RoomWithNumber) => {
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
