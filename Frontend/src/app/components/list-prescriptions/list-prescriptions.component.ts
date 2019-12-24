import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-prescriptions',
  templateUrl: './list-prescriptions.component.html',
  styleUrls: ['./list-prescriptions.component.css']
})
export class ListPrescriptionsComponent implements OnInit {
  prescriptionsDataSource: MatTableDataSource<Prescription>;
  displayedColumns: string[] = ['patient', 'medicine', 'doctor', 'stamp'];
  stampPrescriptionSuccess: Subscription;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private toastr: ToastrService, private prescriptionService: PrescriptionService) { }

  ngOnInit() {
    this.fetchData();

    this.stampPrescriptionSuccess = this.prescriptionService.stampPrescriptionSuccesEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData() {
    this.prescriptionService.getUnstampedPrescriptions().subscribe(data => {
      this.prescriptionsDataSource = new MatTableDataSource(data);
      this.prescriptionsDataSource.paginator = this.paginator;
      this.prescriptionsDataSource.sort = this.sort;
    })
  }

  stampPrescription(prescription: Prescription) {
    this.prescriptionService.stamp(prescription).subscribe(
      () => {
        this.toastr.success(
          "Prescription successfully stamped.",
          'Stamp prescription'
        );
        this.prescriptionService.stampPrescriptionSuccesEmitter.next();
      },
      () => {
        this.toastr.error("Prescription has been already stamped.", 'Stamp prescription');
      }
    )
  }
}
