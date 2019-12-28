import { EditRoom } from './../../../models/editRoom';
import { Room } from './../../../models/room';
import { RoomService } from './../../../services/room.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  editRoomForm: FormGroup;
  kinds = ['EXAMINATION', 'OPERATION'];

  constructor(private toastr: ToastrService, private roomService: RoomService,
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedRoom: Room) { }

  ngOnInit() {
    this.editRoomForm = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      kind: new FormControl(null, Validators.required)
    });
    this.editRoomForm.patchValue(
      {
        'label': this.selectedRoom.label,
        'kind': this.selectedRoom.kind
      }
    );
  }

  edit() {
    if (this.editRoomForm.invalid) {
      this.toastr.error('Please enter a valid data. ', 'Edit room');
      return;
    }

    const room = new EditRoom(this.selectedRoom.id, this.editRoomForm.value.label, this.editRoomForm.value.kind);

    this.roomService.edit(room).subscribe(
      (responseData: Room) => {
        this.editRoomForm.reset();
        this.dialogRef.close();
        this.toastr.success('Successfully changed a room. ', 'Edit room');
        this.roomService.createSuccessEmitter.next(responseData);
      },
      () => {
        this.toastr.error('You can not edit this room because this room is reserved for some examination or room with same label already exist. ',
          'Edit room ');
        this.dialogRef.close();
      }
    );
  }


}
