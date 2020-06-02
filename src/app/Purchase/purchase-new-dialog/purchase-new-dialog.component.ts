import { Component, OnInit } from '@angular/core';
import {Purchase} from '../../domain/purchase';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-new-dialog',
  templateUrl: './purchase-new-dialog.component.html',
  styleUrls: ['./purchase-new-dialog.component.css']
})
export class PurchaseNewDialogComponent implements OnInit {
  purchase: Purchase;

  constructor(private dialogRef: MatDialogRef<Purchase>) {
    this.purchase = new Purchase();
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.purchase);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
