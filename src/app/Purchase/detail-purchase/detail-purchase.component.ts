import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../domain/purchase';

@Component({
  selector: 'app-detail-purchase',
  templateUrl: './detail-purchase.component.html',
  styleUrls: ['./detail-purchase.component.css']
})
export class DetailPurchaseComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor() { }

  ngOnInit(): void {
  }

}
