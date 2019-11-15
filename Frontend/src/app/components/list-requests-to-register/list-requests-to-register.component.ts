import { RequestToRegisterService } from './../../services/request-to-register.service';
import { Component, OnInit, Input } from '@angular/core';
import { RequestToRegister } from 'src/app/models/request-to-register';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RejectRequestToRegisterComponent } from '../reject-request-to-register/reject-request-to-register.component';
import { print } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-requests-to-register',
  templateUrl: './list-requests-to-register.component.html',
  styleUrls: ['./list-requests-to-register.component.css']
})
export class ListRequestsToRegisterComponent implements OnInit {

  requestToRegisterDataSource: MatTableDataSource<RequestToRegister>
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'approve', 'reject'];

  private rejectingRequestSuccess: Subscription;

  constructor(
    private requestToRegisterService: RequestToRegisterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchData();

    this.rejectingRequestSuccess = this.requestToRegisterService.rejectSuccessEmitter.subscribe(
      data => {
        this.fetchData();
      }
    )
  }

  fetchData() {
    this.requestToRegisterService.getRequestsToRegister().subscribe(data => {
      this.requestToRegisterDataSource = new MatTableDataSource(data);
    });
  }

  openApproveDialog() {

  }

  openRejectDialog(requestId) {
    this.dialog.open(RejectRequestToRegisterComponent, { data: { id: requestId } });
  }

}
