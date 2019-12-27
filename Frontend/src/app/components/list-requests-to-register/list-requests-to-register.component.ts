
import { environment } from './../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestToRegister } from 'src/app/models/request-to-register';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RejectRequestToRegisterComponent } from '../reject-request-to-register/reject-request-to-register.component';
import { Subscription } from 'rxjs';
import { ApproveRequestToRegisterComponent } from '../approve-request-to-register/approve-request-to-register.component';
import { RequestToRegisterService } from 'src/app/services/request-to.register.service';
@Component({
  selector: 'app-list-requests-to-register',
  templateUrl: './list-requests-to-register.component.html',
  styleUrls: ['./list-requests-to-register.component.css']
})
export class ListRequestsToRegisterComponent implements OnInit {
  requestToRegisterDataSource: MatTableDataSource<RequestToRegister>
  displayedColumns = ['firstName', 'lastName', 'email', 'approve', 'reject'];
  rejectingRequestSuccess: Subscription;
  approvingRequestSuccess: Subscription;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private requestToRegisterService: RequestToRegisterService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchData();

    this.rejectingRequestSuccess = this.requestToRegisterService.rejectSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )

    this.approvingRequestSuccess = this.requestToRegisterService.approveSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData(): void {
    this.requestToRegisterService.getRequestsToRegister().subscribe((data) => {
      this.requestToRegisterDataSource = new MatTableDataSource(data);
      this.requestToRegisterDataSource.paginator = this.paginator;
    });
  }

  openApproveDialog(request): void {
    this.dialog.open(ApproveRequestToRegisterComponent, { data: { requestToRegister: request } });
  }

  openRejectDialog(requestId): void {
    this.dialog.open(RejectRequestToRegisterComponent, { data: { id: requestId } });
  }
}
