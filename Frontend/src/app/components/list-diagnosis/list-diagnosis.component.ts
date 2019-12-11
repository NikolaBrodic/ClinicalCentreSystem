import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Diagnose } from 'src/app/models/diagnose';
import { DiagnoseService } from 'src/app/services/diagnose.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-list-diagnosis',
  templateUrl: './list-diagnosis.component.html',
  styleUrls: ['./list-diagnosis.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListDiagnosisComponent implements OnInit {
  diagnosisDataSource: MatTableDataSource<Diagnose>;
  displayedColumns: string[] = ['title', 'description'];
  expandedElement: Diagnose | null;

  constructor(
    private diagnoseService: DiagnoseService,
  ) { }

  ngOnInit() {

    this.fetchData();
  }

  openAddDialog() {

  }

  fetchData() {
    this.diagnoseService.getAllDiagnosis().subscribe(data => {
      this.diagnosisDataSource = new MatTableDataSource(data);
    })
  }
}
