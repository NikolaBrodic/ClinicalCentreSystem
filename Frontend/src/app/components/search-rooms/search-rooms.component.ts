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

  constructor(public dialog: MatDialog,
    private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    //TODO: QUERY-> PARAM
    this.getRoomsForAdminPaging(0, 5, null);
    this.route.queryParams.subscribe(params => {
      var param = params['kind'];
      console.log(param)
      if ("operation" === param) {
        this.kind = "OPERATION";
      } else if ("examination" === param) {
        this.kind = "EXAMINATION";
      } else {
        //TODO: ADMIN HOME PAGE
        console.log("eror")
        this.router.navigate(['/error']);
      }
    });

  }
  sortEvent() {
    this.getRoomsForAdminPaging(this.paginator.pageIndex, 5, this.sort);

  }

  assignRoom() {

  }

  seacrhRooms() {
    this.getRoomsForAdminPaging(this.paginator.pageIndex, 5, this.sort);
  }

  getRoomsForAdminPaging(pageIndex, pageSize, sort) {
    this.roomService.getRoomsForAdminPaging(pageIndex, pageSize, sort, this.kind).subscribe((data: RoomWithNumber) => {
      this.numberOfItem = data.numberOfItems;
      this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
      this.roomsDataSource.sort = this.sort;
    })
  }

  changePage() {
    this.getRoomsForAdminPaging(this.paginator.pageIndex, 5, this.sort);
  }

}
