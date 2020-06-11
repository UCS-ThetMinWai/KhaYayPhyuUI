import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Customer} from '../../domain/customer';
import {ProductNewDialogComponent} from '../product-new-dialog/product-new-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomerNewDialogComponent} from '../../customer/customer-new-dialog/customer-new-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RawProductNewDialogComponent} from '../../RawProduct/raw-product-new-dialog/raw-product-new-dialog.component';
import {RawProduct} from '../../domain/raw-product';
import {RawProductService} from '../../shared/raw-product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {element} from "protractor";
import {Product} from '../../domain/product';

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styleUrls: ['./product-base.component.css']
})
export class ProductBaseComponent implements OnInit {
  productList: Product[] = [];

  detailProduct = null;

  productDialog: ProductNewDialogComponent;

  rawProductDialog: RawProductNewDialogComponent;

  editStatus = {};

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
      const updatedIndex = this.findIndexOfProductFromList(product);
      this.productList[updatedIndex] = this.detailProduct;
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

  public remove(product: Product) {
    this.showWarning(() => {
      this.productService.delete(product).subscribe(status => {
        if (status) {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.removeProductFromList(product);
        }
      });
    });
  }

  public show(elementName) {
    this.editStatus[elementName] = true;
  }

  public hideAndSave(elementName) {
    this.save();
    this.editStatus[elementName] = false;
  }

  public isEnableEdit(elementName) {
    return !this.editStatus[elementName];
  }

  public isDisabledEdit(elementName) {
    return !this.isEnableEdit(elementName);
  }

  private removeProductFromList(product: Product) {
    let index = this.findIndexOfProductFromList(product);
    this.productList.splice(index, 1);
    this.detailProduct = null;
  }

  private findIndexOfProductFromList(product: Product) {
    for (let i = 0; i < this.productList.length; i++) {
      const deleteProduct = this.productList[i];
      if (deleteProduct.boId === product.boId) {
        return i;
      }
    }
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
      this.openSnackBar('Message', 'success');
    }, error => {
      this.openSnackBar('Message', 'Error');
    });
  }

  public toDate(timeStamp) {
    return new Date(timeStamp);
  }

  private showWarning(func) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        func();
      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'info',
          title: 'User cancel operation.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
