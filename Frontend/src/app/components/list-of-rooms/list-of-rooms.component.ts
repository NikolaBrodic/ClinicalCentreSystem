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
  public searchString: string;
  filterInput: HTMLInputElement;
  private successCreatedRoom: Subscription;
  numberOfItem: number;

  constructor(public dialog: MatDialog,
    private roomService: RoomService, private toastr: ToastrService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.getRoomsForAdmin();

    this.successCreatedRoom = this.roomService.createSuccessEmitter.subscribe(
      data => {
        this.getRoomsForAdmin();
      }
    );
  }

  getRoomsForAdmin() {
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement;
    this.filterInput.value = "";
    this.roomService.getAllRoomsForAdmin().subscribe(data => {
      this.roomsDataSource = new MatTableDataSource(data);
      this.roomsDataSource.sort = this.sort;
    })
  }

  openCreatingDialog() {
    this.dialog.open(AddRoomComponent);
  }

  applyFilter(filterValue: string) {
    this.roomsDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditingDialog() {

  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room.id).subscribe(
      responseData => {
        this.getRoomsForAdmin();
        this.toastr.success("Successfully deleted room.", 'Delete room');
      },
      message => {
        this.toastr.error("You can not delete this room because this room is reserved.", 'Delete room');
      }
    );
  }

}
