import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Product} from '../../domain/product';
import {ProductService} from "../../shared/product.service";
import {Item} from "../../domain/item";

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.css']
})

export class ProductNewDialogComponent implements OnInit {
  product: Product;

  productList: Product[] = [];

  public static edit(product: Product, dialog: MatDialog) {
    return dialog.open(ProductNewDialogComponent, {data: product});
  }

  constructor(
    private dialogRef: MatDialogRef<Product>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private productService: ProductService) {

    this.product = data || new Product();
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(productList => {
      this.productList = this.filter(productList);
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  save() {
    console.log("here", this.product);
    this.dialogRef.close(this.product);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  public updateProductList(product: Product, index: number) {
    console.log('here', this.product.itemList);
    this.product.itemList.push(Item.createWithFullData(product, this.product, 0));
    this.productList.splice(index, 1);
  }

  public addToProductList(product: Product, index: number) {
    this.productList.push(product);
    this.product.itemList.splice(index, 1);
  }

  private filter(productList: Product[]) {
    productList = productList.filter(product => this.product.isNotSame(product));
    this.product.itemList.forEach(item => productList = productList.filter(product => item.product.isNotSame(product)));
    return productList;
  }
}
