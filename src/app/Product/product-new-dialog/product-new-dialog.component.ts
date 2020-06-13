import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../domain/product';

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.css']
})

export class ProductNewDialogComponent implements OnInit {
  product: Product;

  constructor(private dialogRef: MatDialogRef<Product>, private dialog: MatDialog, private snackBar: MatSnackBar, private httpClient: HttpClient) {
    this.product = new Product();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  save() {
    console.log(this.product);
    this.dialogRef.close(this.product);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
