import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {DetailComponent} from './detail/detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {OverlayContainer} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './base/main/main.component';
import {MatCardModule} from '@angular/material/card';
import {ProductBaseComponent} from './Product/product-base/product-base.component';
import {CustomerBaseComponent} from './customer/customer-base/customer-base.component';
import {UserBaseComponent} from './user/user-base/user-base.component';
import {PurchaseBaseComponent} from './Purchase/purchase-base/purchase-base.component';
import {PurchaseOrderBaseComponent} from './PurchaseOrder/purchase-order-base/purchase-order-base.component';
import {SaleOrderBaseComponent} from './SaleOrder/sale-order-base/sale-order-base.component';
import {SaleBaseComponent} from './Sale/sale-base/sale-base.component';
import {RawProductBaseComponent} from './RawProduct/raw-product-base/raw-product-base.component';
import {PriceBaseComponent} from './Price/price-base/price-base.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomerNewDialogComponent } from './customer/customer-new-dialog/customer-new-dialog.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SaleNewDialogComponent } from './Sale/sale-new-dialog/sale-new-dialog.component';
import { PurchaseNewDialogComponent } from './Purchase/purchase-new-dialog/purchase-new-dialog.component';
import { RawProductNewDialogComponent } from './RawProduct/raw-product-new-dialog/raw-product-new-dialog.component';
import { PriceNewDialogComponent } from './Price/price-new-dialog/price-new-dialog.component';
import { PurchaseOrderNewDialogComponent } from './PurchaseOrder/purchase-order-new-dialog/purchase-order-new-dialog.component';
import { SaleOrderNewDialogComponent } from './SaleOrder/sale-order-new-dialog/sale-order-new-dialog.component';
import {ProductNewDialogComponent} from './Product/product-new-dialog/product-new-dialog.component';
import {UserNewDialogComponent} from './user/user-new-dialog/user-new-dialog.component';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    MainComponent,
    ProductBaseComponent,
    CustomerBaseComponent,
    UserBaseComponent,
    PurchaseBaseComponent,
    PurchaseOrderBaseComponent,
    SaleOrderBaseComponent,
    SaleBaseComponent,
    RawProductBaseComponent,
    PriceBaseComponent,
    CustomerNewDialogComponent,
    ProductBaseComponent,
    ProductNewDialogComponent,
    UserNewDialogComponent,
    SaleNewDialogComponent,
    PurchaseNewDialogComponent,
    SaleOrderBaseComponent,
    SaleNewDialogComponent,
    RawProductNewDialogComponent,
    PriceNewDialogComponent,
    PurchaseOrderNewDialogComponent,
    SaleOrderNewDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [MatButtonModule],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class UnicornCandyAppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
