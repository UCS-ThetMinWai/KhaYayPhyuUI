import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {

  datasets = [500, 700, 60]

  labels = ['Food', 'Product','Test'];

  constructor() {
    this.datasets = [500, 700, 60,300]
    this.labels = ['Food', 'Product','Test','O'];
  }

  ngOnInit(): void {
  }

}
