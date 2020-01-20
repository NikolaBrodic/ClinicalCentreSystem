import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-daily-statistic',
  templateUrl: './daily-statistic.component.html',
  styleUrls: ['./daily-statistic.component.css']
})
export class DailyStatisticComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
    title: {
      display: true,
      text: 'Held examinations - Daily statistics',
      fontSize: 20
    },
  };

  public barChartLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
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

    this.clinicService.getDailyStatistic().subscribe((data: Number[]) => {
      this.barChartData = [
        { data: data, label: 'Number of examinations' }
      ];
    })
  }


}
