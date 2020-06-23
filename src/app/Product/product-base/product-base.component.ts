import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Customer} from '../../domain/customer';
import {ProductNewDialogComponent} from '../product-new-dialog/product-new-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomerNewDialogComponent} from '../../customer/customer-new-dialog/customer-new-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {element} from "protractor";
import {Product} from '../../domain/product';
import {ProductChartData} from "../../domain/product-chart-data";

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styleUrls: ['./product-base.component.css']
})

export class ProductBaseComponent implements OnInit {

  @Output()
  public searchResult = new EventEmitter<string>();

  productList: Product[] = [];

  detailProduct = null;

  chartData: ProductChartData = null;

  productDialog: ProductNewDialogComponent;

  barChartLegend = true;

  editStatus = {};

  chartOption: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private productService: ProductService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public search(text) {
    this.productService.searchWithProduct().subscribe(result => {
      this.productList = result;
    });
  }

  public edit() {
    ProductNewDialogComponent.edit(this.detailProduct, this.dialog).afterClosed().subscribe(product => this.saveToDb(product));
  }

  public showDetail(id) {
    this.productService.byId(id).subscribe(product => {
      this.detailProduct = product;
      console.log(this.detailProduct);
      const updatedIndex = this.findIndexOfProductFromList(product);
      this.productList[updatedIndex] = this.detailProduct;
      this.chartData = new ProductChartData(product);
    });
  }

  public searchWithName(text) {
    this.productService.byName(text).subscribe(productList => {
      this.productList = productList;
      console.log("here");
      this.searchResult.emit(this.productList.length + ' found.');
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

  private saveToDb(product) {
    if (product == null)
      return;
    this.productService.save(product).subscribe(pProduct => {
      this.openSnackBar('Save', 'success!');
    }, error => {
      console.error(error);
      this.openSnackBar('Message', 'Error');
    });
  }

  public show(elementName) {
    this.editStatus[elementName] = true;
  }

  public hideAndSave(elementName) {
    this.save();
    this.editStatus[elementName] = false;
  }

  public hideAndUpdatePrice(elementName) {
    this.productService.updateSalePrice(this.detailProduct, this.detailProduct.salePrice.amount).subscribe(product => {
      this.replaceList(product);
      this.editStatus[elementName] = false;
    });
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

  private replaceList(product: Product) {
    const index = this.findIndexOfProductFromList(product);
    this.productList[index] = product;
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
