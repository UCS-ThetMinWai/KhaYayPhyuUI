import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Sale} from '../../domain/sale';
import {Product} from '../../domain/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../domain/customer';
import {SaleOrder} from '../../domain/sale-order';
import {ProductService} from '../../shared/product.service';
import {CustomerService} from '../../shared/customer.service';

@Component({
  selector: 'app-sale-new-dialog',
  templateUrl: './sale-new-dialog.component.html',
  styleUrls: ['./sale-new-dialog.component.css']
})
export class SaleNewDialogComponent implements OnInit {
  sale: Sale;
  saleOrderList: SaleOrder[];
  customerList: Customer[];
  productList: Product[];

  displayColumns: string[] = ['name'];

  constructor(private dialogRef: MatDialogRef<Sale>, private snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, private customerService: CustomerService) {
    this.sale = new Sale();
    this.initializeCustomer();
    this.sale.saleOrderList.push(new SaleOrder());
    this.sale.customer = new Customer();
    this.productService.search().subscribe(productList => {
      this.productList = productList;
    });
  }

  ngOnInit(): void {

  }

  public save() {
    this.sale.saleOrderList.forEach(saleOrder => {
      console.log("sale order ", saleOrder);
      const boId = saleOrder['name'].split(':')[1];
      saleOrder.product = this.findProductByBoId(boId);
    });
    console.log("Sale is:", this.sale);
    this.dialogRef.close(this.sale);
  }

  private findProductByBoId(id: string) {
    for (const product of this.productList) {
      if (product.boId === id) {
        return product;
      }
    }
    return null;
  }

  private initializeCustomer() {
    this.customerService.search().subscribe((jsons: any[]) => {
      this.customerList = [];
      jsons.forEach(customer => {
        if (customer.name == null) {
          return;
        }
        this.customerList.push(Sale.createCustomer(customer));
      });
    });
  }

  public initializeSaleOrder() {
    this.saleOrderList = [];
    // this.saleOrderList = this.sale.saleOrder.product.productName;
  }

  public updateCustomer(customer: Customer) {
    this.sale.customer = customer;
  }

  public updateSaleOrder(saleOrder: SaleOrder) {
    // this.sale.saleOrder = saleOrder;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public addNewSaleOrder() {
    this.sale.saleOrderList.push(new SaleOrder());
  }

  closeDialog() {
    console.log(this.sale);
    this.dialogRef.close(null);
  }

  updatePrice(saleOrder: SaleOrder, productStr: string) {
    const productId = productStr.split(':')[1];
    const selectedProduct = this.findProductByBoId(productId);
    if (selectedProduct.currentPrice == null) {
      return;
    }
    saleOrder.quantity = saleOrder.quantity || 0;
    saleOrder.amount = selectedProduct.currentPrice.saleAmount * saleOrder.quantity;

  }

}
