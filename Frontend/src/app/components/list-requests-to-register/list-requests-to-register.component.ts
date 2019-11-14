import { RequestToRegisterService } from './../../services/request-to-register.service';
import { Component, OnInit } from '@angular/core';
import { RequestToRegister } from 'src/app/models/request-to-register';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-requests-to-register',
  templateUrl: './list-requests-to-register.component.html',
  styleUrls: ['./list-requests-to-register.component.css']
})
export class ListRequestsToRegisterComponent implements OnInit {
  requestToRegisterDataSource: MatTableDataSource<RequestToRegister>
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'approve', 'reject'];

  constructor(private requestToRegisterService: RequestToRegisterService) { }

  ngOnInit() {
    this.requestToRegisterService.getRequestsToRegister().subscribe(data => {
      this.requestToRegisterDataSource = new MatTableDataSource(data);
    });
  }

  openApproveDialog() {

  }

  openRejectDialog() {

  }

}
