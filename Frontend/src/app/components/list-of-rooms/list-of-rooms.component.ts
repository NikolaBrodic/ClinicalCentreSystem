import { EditRoomComponent } from './../edit/edit-room/edit-room.component';
import { isUndefined } from 'util';
import { RoomsWithNumberOffItmes } from './../../models/roomsWithNumberOffItmes';
import { environment } from './../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { AddRoomComponent } from './../add-room/add-room.component';
import { RoomService } from './../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Room } from './../../models/room';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-of-rooms',
  templateUrl: './list-of-rooms.component.html',
  styleUrls: ['./list-of-rooms.component.css']
})
export class ListOfRoomsComponent implements OnInit {

  roomsDataSource: MatTableDataSource<Room>;
  displayedColumns: string[] = ['label', 'kind', 'update', 'delete'];
  searchString: string;
  filterInput: HTMLInputElement;
  successCreatedRoom: Subscription;
  numberOfItem: number;
  itemsPerPage = environment.itemsPerPage;
  searchExaminationType: string;
  searchLabel: string = '';

  constructor(public dialog: MatDialog,
    private roomService: RoomService, private toastr: ToastrService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.searchRooms(0);

    this.successCreatedRoom = this.roomService.createSuccessEmitter.subscribe(
      () => {
        this.searchExaminationType = 'All';
        this.searchLabel = '';
        this.searchRooms(0);
      }
    );
  }

  searchRooms(pageIndex: number) {
    if (isUndefined(this.searchExaminationType)) {
      this.searchExaminationType = '';
    }
    this.paginator.pageIndex = pageIndex;
    this.roomService.getRoomsForAdminPaging
      (pageIndex, 5, this.sort, this.searchExaminationType.toLowerCase(), this.searchLabel, '', '', '').
      subscribe((data: RoomsWithNumberOffItmes) => {
        this.numberOfItem = data.numberOfItems;
        this.roomsDataSource = new MatTableDataSource(data.roomDTOList);
        this.roomsDataSource.sort = this.sort;
      })
  }

  searchRoomsClick() {
    this.searchRooms(0);
  }

  sortEvent() {
    this.searchRooms(0);
  }

  changePage() {
    this.searchRooms(this.paginator.pageIndex);
  }

  openCreatingDialog() {
    this.dialog.open(AddRoomComponent);
  }

  applyFilter(filterValue: string) {
    this.roomsDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditingDialog(room: Room) {
    this.dialog.open(EditRoomComponent, { data: room });
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room.id).subscribe(
      () => {
        this.searchRooms(0);
        this.toastr.success('Successfully deleted room.', 'Delete room');
      },
      () => {
        this.toastr.error('You can not delete this room because this room is reserved.', 'Delete room');
      }
    );
  }

}
