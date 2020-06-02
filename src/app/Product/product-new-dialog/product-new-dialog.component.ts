import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../domain/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RawProduct} from '../../domain/raw-product';
import {HttpClient} from '@angular/common/http';
import {RawProductNewDialogComponent} from '../../RawProduct/raw-product-new-dialog/raw-product-new-dialog.component';
import {RawProductService} from '../../shared/raw-product.service';

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.css']
})

export class ProductNewDialogComponent implements OnInit {
  product: Product;

  rawProductList: RawProduct[];

  rawProductDialog: RawProductNewDialogComponent;

  constructor(private dialogRef: MatDialogRef<Product>, private dialog: MatDialog, private snackBar: MatSnackBar, private httpClient: HttpClient, private rawProductService: RawProductService) {
    this.product = new Product();
    this.product.rawProduct = new RawProduct();
    this.initializeRawProduct();
  }

  ngOnInit(): void {
  }

  private initializeRawProduct() {
    this.httpClient.get('http://localhost:8080/khayayphyu-application/rawProduct/list').subscribe((jsons: any[]) => {
      this.rawProductList = [];
      jsons.forEach(rProduct => {
        this.rawProductList.push(Product.createRawProduct(rProduct));
      });
    });
  }

  public updateRaw(raw: RawProduct) {
    this.product.rawProduct = raw;
    console.log(this.product.rawProduct);
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
