import {Component, OnInit} from '@angular/core';
import {PurchaseService} from '../../shared/purchase.service';
import {Purchase} from '../../domain/purchase';
import {PurchaseNewDialogComponent} from '../purchase-new-dialog/purchase-new-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-base',
  templateUrl: './purchase-base.component.html',
  styleUrls: ['./purchase-base.component.css']
})
export class PurchaseBaseComponent implements OnInit {
  purchaseList: Purchase[] = [];
  detailPurchase = null;
  pruchaseDialog: PurchaseNewDialogComponent;

  constructor(private purchaseService: PurchaseService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public remove(boId) {
    let index = 0;
    for (let i = 0; i < this.purchaseList.length; i++) {
      const purchase = this.purchaseList[i];
      if (purchase.boId === boId) {
        index = i;
        break;
      }
    }
    this.purchaseList.splice(index, 1);
    this.detailPurchase = null;
  }

  public openPurchaseDialog() {
    const dialogRef = this.dialog.open(PurchaseNewDialogComponent);
    dialogRef.afterClosed().subscribe((purchase: Purchase) => {
      if (purchase == null) {
        return;
      }

      purchase.id = 0;
      this.purchaseService.save(purchase).subscribe(t => {
        console.log(t);
      });
    });
  }

  public search() {
    this.purchaseService.searchWithPurchase().subscribe(result => {
      console.log('Result is ', result);
      this.purchaseList = result;
    });
  }

  public save() {
    this.purchaseService.save(this.detailPurchase).subscribe(status => {
      window.alert('Success');
    });
  }

  public showDetail(id) {
    this.purchaseService.byId(id).subscribe(purchase => {
      this.detailPurchase = purchase;
      console.log(this.detailPurchase);
    });
  }
}
