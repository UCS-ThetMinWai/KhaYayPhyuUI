import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Sale} from '../../domain/sale';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {PurchaseOrder} from '../../domain/sale-order';
import {ProductService} from '../../shared/product.service';
import {CustomerService} from '../../shared/customer.service';
import {Product} from '../../domain/product';
import {Customer} from '../../domain/customer';

@Component({
  selector: 'app-sale-new-dialog',
  templateUrl: './sale-new-dialog.component.html',
  styleUrls: ['./sale-new-dialog.component.css']
})
export class SaleNewDialogComponent implements OnInit, AfterViewInit {
  sale: Sale;
  saleOrderList: PurchaseOrder[];
  customerList: Customer[];
  productList: Product[];

  displayColumns: string[] = ['name'];

  @ViewChildren('productQuantity')
  productQuantity;

  @ViewChildren('productSelection')
  productSelection;

  constructor(private dialogRef: MatDialogRef<Sale>, private snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, private customerService: CustomerService) {
    this.sale = new Sale();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.sale = new Sale();
    this.initializeCustomer();
    this.sale.saleOrderList.push(new PurchaseOrder());
    this.sale.customer = new Customer();
    this.sale.saleDate = new Date();
    this.productService.searchWithProduct().subscribe(productList => {
      this.productList = productList;
    });
  }

  public save() {
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
        this.customerList.push(Customer.createCustomer(customer));
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

  public updateSaleOrder(saleOrder: PurchaseOrder) {
    // this.sale.saleOrder = saleOrder;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public addNewSaleOrder() {
    this.sale.saleOrderList.push(new PurchaseOrder());
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  updatePriceForName(saleOrder: PurchaseOrder, productStr: string, index: number) {
    const productId = productStr.split(':')[1];
    const selectedProduct = this.findProductByBoId(productId);
    if (selectedProduct == null)
      return;
    if (selectedProduct.currentSalePrice == null) {
      return;
    }
    saleOrder.quantity = saleOrder.quantity || 0;
    saleOrder.updateAmount();
    saleOrder.product = selectedProduct;
    this.sale.updateTotal();
    this.productQuantity.toArray()[index].nativeElement.focus();
  }

  updatePriceForQuantity(saleOrder: PurchaseOrder, quantity: any, index: number) {
    saleOrder.updateTotal(parseInt(quantity));
    this.sale.updateTotal();
    if (index == this.sale.saleOrderList.length - 1) {
      this.sale.saleOrderList.push(new PurchaseOrder());
      setTimeout(() => {
        this.productSelection.toArray()[index + 1].nativeElement.focus();
      }, 10);
    }
  }

}
