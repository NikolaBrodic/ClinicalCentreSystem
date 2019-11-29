import { RoomService } from './../../services/room.service';
import { Room } from './../../models/room';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  addRoomForm: FormGroup;
  kinds: string[] = ['Examination', 'Operation'];

  constructor(private toastr: ToastrService, private roomService: RoomService,
    public dialogRef: MatDialogRef<AddRoomComponent>) { }

  ngOnInit() {
    this.addRoomForm = new FormGroup({
      label: new FormControl(null, Validators.required),
      kind: new FormControl(null, Validators.required)
    });

  }

  create() {
    if (this.addRoomForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add room');
      return;
    }

    const room = new Room(this.addRoomForm.value.label, this.addRoomForm.value.kind);

    this.roomService.create(room).subscribe(
      responseData => {
        this.addRoomForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new room.", 'Add room');
        this.roomService.createSuccessEmitter.next(room);
      },
      message => {
        this.toastr.error("Room with same label aready exist.", 'Add room');
      }
    );
  }

}
