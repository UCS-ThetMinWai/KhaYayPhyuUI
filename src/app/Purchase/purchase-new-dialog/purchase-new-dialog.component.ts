import {AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {Purchase} from '../../domain/purchase';
import {MatDialogRef} from '@angular/material/dialog';
import {PurchaseOrder} from '../../domain/purchase-order';
import {Customer} from '../../domain/customer';
import {Product} from '../../domain/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../shared/product.service';
import {CustomerService} from '../../shared/customer.service';
import {Sale} from '../../domain/sale';

@Component({
  selector: 'app-purchase-new-dialog',
  templateUrl: './purchase-new-dialog.component.html',
  styleUrls: ['./purchase-new-dialog.component.css']
})
export class PurchaseNewDialogComponent implements OnInit, AfterViewInit {
  purchase: Purchase;
  purchaseOrderList: PurchaseOrder[];
  customerList: Customer[];
  productList: Product[];

  displayColumns: string[] = ['name'];

  @ViewChildren('productQuantity')
  productQuantity;

  @ViewChildren('productSelection')
  productSelection;

  constructor(private dialogRef: MatDialogRef<Purchase>, private snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, private customerService: CustomerService) {
    this.purchase = new Purchase();
  }

  ngOnInit(): void {
    this.purchase = new Purchase();
    this.initializeCustomer();
    this.purchase.purchaseOrderList.push(new PurchaseOrder());
    this.purchase.customer = new Customer();
    this.purchase.purchaseDate = new Date();
    this.productService.searchWithProduct().subscribe(productList => {
      this.productList = productList;
    });
  }

  public save() {
    this.dialogRef.close(this.purchase);
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

  public updateCustomer(customer: Customer) {
    this.purchase.customer = customer;
  }

  public addNewPurchaseOrder() {
    this.purchase.purchaseOrderList.push(new PurchaseOrder());
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  updatePriceForName(purchaseOrder: PurchaseOrder, productStr: string, index: number) {
    const productId = productStr.split(':')[1];
    const selectedProduct = this.findProductByBoId(productId);
    if (selectedProduct == null)
      return;
    if (selectedProduct.purchasePrice == null) {
      return;
    }
    purchaseOrder.quantity = purchaseOrder.quantity || 0;
    purchaseOrder.updateAmount();
    purchaseOrder.product = selectedProduct;
    this.purchase.updateTotal();
    this.productQuantity.toArray()[index].nativeElement.focus();
  }

  updatePriceForQuantity(purchaseOrder: PurchaseOrder, weight: any, index: number) {
    purchaseOrder.updateTotal(parseInt(weight));
    this.purchase.updateTotal();
    if (index == this.purchase.purchaseOrderList.length - 1) {
      this.purchase.purchaseOrderList.push(new PurchaseOrder());
      setTimeout(() => {
        this.productSelection.toArray()[index + 1].nativeElement.focus();
      }, 10);
    }
  }

  ngAfterViewInit(): void {
  }

}
