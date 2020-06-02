import { Component, OnInit } from '@angular/core';
import {RawProduct} from '../../domain/raw-product';
import {MatDialogRef} from '@angular/material/dialog';
import {faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-raw-product-new-dialog',
  templateUrl: './raw-product-new-dialog.component.html',
  styleUrls: ['./raw-product-new-dialog.component.css']
})
export class RawProductNewDialogComponent implements OnInit {

  rawProduct: RawProduct;

  saveIcon = faSave;

  constructor(private dialogRef: MatDialogRef<RawProduct>) {
    this.rawProduct = new RawProduct();
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.rawProduct);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
