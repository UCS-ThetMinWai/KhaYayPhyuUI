import {Component, OnInit} from '@angular/core';
import {SaleService} from '../../shared/sale.service';
import {Sale} from '../../domain/sale';
import {MatDialog} from '@angular/material/dialog';
import {SaleNewDialogComponent} from '../sale-new-dialog/sale-new-dialog.component';
import {SaleOrder} from '../../domain/sale-order';
import {ProductNewDialogComponent} from '../../Product/product-new-dialog/product-new-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale-base',
  templateUrl: './sale-base.component.html',
  styleUrls: ['./sale-base.component.css']
})
export class SaleBaseComponent implements OnInit {
  saleList: Sale[] = [];
  saleOrderList: SaleOrder[] = [];
  detailSale = null;
  saleDialog: SaleNewDialogComponent;

  viewReport = false;

  constructor(private saleService: SaleService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public search() {
    return this.saleService.searchWithSale().subscribe(result => {
      this.saleList = result;
    });
  }

  public edit() {
    SaleNewDialogComponent.edit(this.detailSale, this.dialog).afterClosed().subscribe(sale => {
      if (sale != null) {
        this.saveToDb(sale);
      }
    });
  }

  public showDetail(id) {
    return this.saleService.byId(id).subscribe(sale => {
      this.detailSale = sale;
    });
  }

  public toDate(timeStamp) {
    return new Date(timeStamp);
  }

  public openSaleDialog() {
    const dialogRef = this.dialog.open(SaleNewDialogComponent);
    dialogRef.afterClosed().subscribe((sale: Sale) => {
      if (sale == null) {
        return;
      }
      sale.id = 0;
      this.saleService.save(sale).subscribe(t => {
        console.log(t);
      });
    });
  }

  private saveToDb(sale) {
    if (sale == null) {
      return;
    }
    this.saleService.save(sale).subscribe(pSale => {
      this.openSnackBar('Save', 'success!');
    }, error => {
      console.error(error);
      this.openSnackBar('Message', 'Error');
    });
  }

  public saleReport() {
    this.detailSale = null;
    this.saleList = [];
    this.viewReport = !this.viewReport;
  }

  public save() {
    this.saleService.save(this.detailSale).subscribe(status => {
      window.alert('Success');
    });
  }

  openSnackBar(message: string, action: string) {
    console.log('here');
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
