import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Product} from '../../domain/product';
import {ProductNewDialogComponent} from '../product-new-dialog/product-new-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomerNewDialogComponent} from '../../customer/customer-new-dialog/customer-new-dialog.component';
import {Customer} from '../../domain/customer';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RawProductNewDialogComponent} from '../../RawProduct/raw-product-new-dialog/raw-product-new-dialog.component';
import {RawProduct} from '../../domain/raw-product';
import {RawProductService} from '../../shared/raw-product.service';
import {faPlusCircle, faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styleUrls: ['./product-base.component.css']
})
export class ProductBaseComponent implements OnInit {
  productList: Product[] = [];

  plusCircleIcon = faPlusCircle;

  detailProduct = null;

  productDialog: ProductNewDialogComponent;

  rawProductDialog: RawProductNewDialogComponent;
  constructor(private productService: ProductService, private dialog: MatDialog, private snackBar: MatSnackBar, private rawProductService: RawProductService) {
  }

  ngOnInit(): void {
  }

  public search(text) {
    this.productService.searchWithProduct().subscribe(result => {
      console.log('Result is ', result);
      this.productList = result;
    });
  }

  public showDetail(id) {
    this.productService.byId(id).subscribe(product => {
      this.detailProduct = product;
      console.log(this.detailProduct);
    });
  }

  public openRawProductDialog() {
    const dialogRef = this.dialog.open(RawProductNewDialogComponent);
    dialogRef.afterClosed().subscribe((rawProduct: RawProduct) => {
      if (rawProduct == null) {
        return;
      }
      rawProduct.id = 0;
      this.rawProductService.save(rawProduct).subscribe(t => {
        this.openSnackBar('Save', 'success!');
        console.log(t);
      }, error => {
        this.openSnackBar('Message', 'Error');
      });
    });
  }

  public remove(boId) {
    let index = 0;
    for (let i = 0; i < this.productList.length; i++) {
      const purchase = this.productList[i];
      if (purchase.boId === boId) {
        index = i;
        break;
      }
    }
    this.productList.splice(index, 1);
    this.detailProduct = null;
  }

  public openProductDialog() {
    const dialogRef = this.dialog.open(ProductNewDialogComponent);
    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product == null) {
        return;
      }
      product.id = 0;
      this.productService.save(product).subscribe(t => {
        this.openSnackBar('Save', 'success!');
        console.log(t);
      }, error => {
        this.openSnackBar('Message', 'Error');
      });
    });
  }

  openSnackBar(message: string, action: string) {
    console.log('here');
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public save() {
    this.productService.save(this.detailProduct).subscribe(status => {
      console.log(status);
      this.openSnackBar('Message', 'success');
    }, error => {
      this.openSnackBar('Message', 'Error');
    });
  }

  public toDate(timeStamp) {
    return new Date(timeStamp);
  }
}
