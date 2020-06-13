import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductBaseComponent} from './Product/product-base/product-base.component';
import {UserBaseComponent} from './user/user-base/user-base.component';
import {CustomerBaseComponent} from './customer/customer-base/customer-base.component';
import {SaleBaseComponent} from './Sale/sale-base/sale-base.component';
import {PurchaseBaseComponent} from './Purchase/purchase-base/purchase-base.component';
import {faPlusCircle, faSave, faSearch} from '@fortawesome/free-solid-svg-icons';
import {text} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public appMain;

  searchText = '';

  title = 'kyp-ui';

  selected = 'product';

  searchResultText: string = '';

  @ViewChild(ProductBaseComponent)
  public productMain: ProductBaseComponent;

  @ViewChild(UserBaseComponent)
  public userMain: UserBaseComponent;

  @ViewChild(CustomerBaseComponent)
  public customerMain: CustomerBaseComponent;

  @ViewChild(SaleBaseComponent)
  public saleMain: SaleBaseComponent;

  @ViewChild(PurchaseBaseComponent)
  public purchaseMain: PurchaseBaseComponent;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.customerMain.searchResult.subscribe(customerText => {
      this.searchResultText = customerText;
    });
    this.productMain.searchResult.subscribe(productText => {
      this.searchResultText = productText;
    });
    this.userMain.searchResult.subscribe( userText => {
      this.searchResultText = userText;
    })
  }


  search() {
    switch (this.selected) {
      case 'product':
        this.productMain.searchWithName(this.searchText);
        break;
      case 'user':
        this.userMain.searchWithName(this.searchText);
        break;
      case 'customer':
        this.customerMain.searchWithName(this.searchText);
        break;
    }
  }

  openDialog() {
    switch (this.selected) {
      case 'product':
        this.productMain.openProductDialog();
        break;
      case 'user':
        this.userMain.openUserDialog();
        break;
      case 'customer':
        this.customerMain.openCustomerDialog();
        break;
      case 'sale':
        this.saleMain.openSaleDialog();
        break;
      case 'purchase':
        this.purchaseMain.openPurchaseDialog();
    }
  }

  updateStatus(element): void {
    this.selected = element;
  }
}
