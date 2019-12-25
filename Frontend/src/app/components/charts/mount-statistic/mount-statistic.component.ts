import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-mount-statistic',
  templateUrl: './mount-statistic.component.html',
  styleUrls: ['./mount-statistic.component.css']
})
export class MountStatisticComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Number of examinations' }
  ];


  public chartColors: any[] =
    [
      {
        backgroundColor: '#87C7F3',
        borderColor: '#87C7F3'
      }
    ]
  constructor(private clinicService: ClinicService) { }

  ngOnInit() {

    this.clinicService.getMountStatistic().subscribe((data: Number[]) => {
      this.barChartData = [
        { data: data, label: 'Number of examinations' }
      ];
    })
  }
}
