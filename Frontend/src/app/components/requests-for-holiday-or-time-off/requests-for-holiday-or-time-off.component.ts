import { RequestsForHolidayOrTimeOff } from './../../models/requestForHolidayOrTimeOff';
import { ApproveRequestForHolidayOrTimeOffComponent } from './../approve-request-for-holiday-or-time-off/approve-request-for-holiday-or-time-off.component';
import { TimeOffNurseService } from './../../services/time-off-nurse.service';
import { TimeOffDoctorService } from './../../services/time-off-doctor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RejectRequestForHolidayOrTimeOffComponent } from '../reject-request-for-holiday-or-time-off/reject-request-for-holiday-or-time-off.component';

@Component({
  selector: 'app-requests-for-holiday-or-time-off',
  templateUrl: './requests-for-holiday-or-time-off.component.html',
  styleUrls: ['./requests-for-holiday-or-time-off.component.css']
})
export class RequestsForHolidayOrTimeOffComponent implements OnInit {
  requestsDataSource: MatTableDataSource<RequestsForHolidayOrTimeOff>;
  requests: RequestsForHolidayOrTimeOff[];
  displayedColumns: string[] = ['name', 'type', 'startDate', 'endDate', 'approve', 'reject'];
  forDoctorOrNurse: string = "Doctor";

  rejectingRequestSuccessDoctor: Subscription;
  approvingRequestSuccessDoctor: Subscription;
  rejectingRequestSuccessNurse: Subscription;
  approvingRequestSuccessNurse: Subscription;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private timeOffDoctorService: TimeOffDoctorService, private timeOffNurseService: TimeOffNurseService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchData();

    this.rejectingRequestSuccessDoctor = this.timeOffDoctorService.rejectSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )

    this.approvingRequestSuccessDoctor = this.timeOffDoctorService.approveSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )

    this.rejectingRequestSuccessNurse = this.timeOffNurseService.rejectSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )

    this.approvingRequestSuccessNurse = this.timeOffNurseService.approveSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData() {
    if (this.forDoctorOrNurse === "Doctor") {
      this.timeOffDoctorService.getRequests().subscribe((data: RequestsForHolidayOrTimeOff[]) => {
        this.requestsDataSource = new MatTableDataSource(data);
        this.requestsDataSource.paginator = this.paginator;
      });
    } else {
      this.timeOffNurseService.getRequests().subscribe((data: RequestsForHolidayOrTimeOff[]) => {
        this.requestsDataSource = new MatTableDataSource(data);
        this.requestsDataSource.paginator = this.paginator;
      });
    }

  }

  openApproveDialog(request) {
    this.dialog.open(ApproveRequestForHolidayOrTimeOffComponent, { data: { requestForHolidayOrTimeOff: request, for: this.forDoctorOrNurse } });
  }

  openRejectDialog(requestId) {
    this.dialog.open(RejectRequestForHolidayOrTimeOffComponent, { data: { id: requestId, for: this.forDoctorOrNurse } });
  }

  changeFor() {
    this.fetchData();
  }
}
