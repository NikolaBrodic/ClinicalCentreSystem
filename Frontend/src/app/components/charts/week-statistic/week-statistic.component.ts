import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-week-statistic',
  templateUrl: './week-statistic.component.html',
  styleUrls: ['./week-statistic.component.css']
})
export class WeekStatisticComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true, stepSize: 1
        }
      }]
    },
    title: {
      display: true,
      text: 'Held examinations - Week statistics',
      fontSize: 20
    },
  };

  public barChartLabels = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'];
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

    this.clinicService.getWeekStatistic().subscribe((data: Number[]) => {
      this.barChartData = [
        { data: data, label: 'Number of examinations' }
      ];
    })
  }


}
