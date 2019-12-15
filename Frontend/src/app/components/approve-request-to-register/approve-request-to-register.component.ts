import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { RejectRequestToRegisterComponent } from '../reject-request-to-register/reject-request-to-register.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestToRegisterService } from 'src/app/services/request-to.register.service';

@Component({
  selector: 'app-approve-request-to-register',
  templateUrl: './approve-request-to-register.component.html',
  styleUrls: ['./approve-request-to-register.component.css']
})
export class ApproveRequestToRegisterComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private requestToRegisterService: RequestToRegisterService,
    public dialogRef: MatDialogRef<RejectRequestToRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  approve() {
    const requestToRegister = this.data.requestToRegister;

    this.requestToRegisterService.approve(requestToRegister).subscribe(
      responseData => {
        this.dialogRef.close();
        this.toastr.success(
          "Request to register is approved. Patient will be notified.",
          "Approve request to register"
        );
        this.requestToRegisterService.approveSuccessEmitter.next();
      },
      errorMessage => {
        this.toastr.error("Request to register can't be aproved.", "Approve request to register");
      }
    )
  }

}
