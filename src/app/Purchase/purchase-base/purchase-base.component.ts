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
        throw new Error("Method not implemented.");
    }

  public search() {
    return this.purchaseService.searchWithPurchase().subscribe(result => {
      this.purchaseList = result;
    });
  }

  public showDetail(id) {
    return this.purchaseService.byId(id).subscribe(sale => {
      this.detailPurchase = sale;
      console.log(this.detailPurchase);
    });
  }

  public toDate(timeStamp) {
    return new Date(timeStamp);
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

  public save() {
    this.purchaseService.save(this.detailPurchase).subscribe(status => {
      window.alert('Success');
    });
  }
}
