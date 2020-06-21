import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../domain/purchase';
import {PurchaseNewDialogComponent} from "../purchase-new-dialog/purchase-new-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-purchase',
  templateUrl: './detail-purchase.component.html',
  styleUrls: ['./detail-purchase.component.css']
})
export class DetailPurchaseComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public update() {
      PurchaseNewDialogComponent.editDialog(this.dialog, this.purchase);
  }

}
