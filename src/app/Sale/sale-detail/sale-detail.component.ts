import {Component, Input, OnInit} from '@angular/core';
import {Sale} from "../../domain/sale";

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @Input() sale: Sale;

  constructor() { }

  ngOnInit(): void {
  }

}
