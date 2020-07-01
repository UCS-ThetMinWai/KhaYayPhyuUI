import {AfterViewInit, Component, Inject, OnInit, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Sale} from '../../domain/sale';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {SaleOrder} from '../../domain/sale-order';
import {ProductService} from '../../shared/product.service';
import {CustomerService} from '../../shared/customer.service';
import {Product} from '../../domain/product';
import {Customer} from '../../domain/customer';
import {PurchaseOrder} from '../../domain/purchase-order';

@Component({
  selector: 'app-sale-new-dialog',
  templateUrl: './sale-new-dialog.component.html',
  styleUrls: ['./sale-new-dialog.component.css']
})
export class SaleNewDialogComponent implements OnInit, AfterViewInit {
  sale: Sale;
  customerList: Customer[];
  productList: Product[];

  displayColumns: string[] = ['name'];

  @ViewChildren('productQuantity')
  productQuantity;

  @ViewChildren('productSelection')
  productSelection;

  public static edit(sale: Sale, dialog: MatDialog) {
    return dialog.open(SaleNewDialogComponent, {data: sale});
  }

  public static editDialog(dialog: MatDialog, sale: Sale) {
    console.log('Sale :', sale);
    const dialogRef = dialog.open(SaleNewDialogComponent, {data: sale});
    return dialogRef;
  }

  constructor(private dialogRef: MatDialogRef<Sale>, private snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, @Inject(MAT_DIALOG_DATA) private data: Sale, private customerService: CustomerService) {
    this.sale = this.data || new Sale();

  }

  ngOnInit(): void {
    this.initializeCustomer();
    if (this.sale.saleOrderList.length <= 0) {
      this.sale.saleOrderList.push(new SaleOrder());
    }
    this.productService.searchWithProduct().subscribe(productList => {
      this.productList = productList;
    });
  }

  public save() {
    console.log('here', this.sale);
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
    this.dialogRef.close(null);
  }

  updatePriceForName(saleOrder: SaleOrder, productStr: string, index: number) {
    const productId = productStr.split(':')[1];
    const selectedProduct = this.findProductByBoId(productId);
    if (selectedProduct == null) {
      return;
    }
    if (selectedProduct.salePrice == null) {
      console.log("Sale Price: ", saleOrder.price);
      return;
    }
    saleOrder.quantity = saleOrder.quantity || 0;
    saleOrder.product = selectedProduct;
    saleOrder.price = selectedProduct.salePrice.amount;
    this.sale.updateTotal();
    this.productQuantity.toArray()[index].nativeElement.focus();
  }

  updatePriceForQuantity(saleOrder: SaleOrder, qty: number, index: number) {
    saleOrder.updateTotal(qty);
    console.log('Quantity :%s', qty);
    if (index == this.sale.saleOrderList.length - 1) {
      this.sale.saleOrderList.push(new SaleOrder());
      setTimeout(() => {
        this.productSelection.toArray()[index + 1].nativeElement.focus();
      }, 10);
    }
  }

  ngAfterViewInit(): void {

  }
}
