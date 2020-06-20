import {Component, OnInit} from '@angular/core';
import {SaleService} from '../../shared/sale.service';
import {Sale} from '../../domain/sale';
import {MatDialog} from '@angular/material/dialog';
import {SaleNewDialogComponent} from '../sale-new-dialog/sale-new-dialog.component';

@Component({
  selector: 'app-sale-base',
  templateUrl: './sale-base.component.html',
  styleUrls: ['./sale-base.component.css']
})
export class SaleBaseComponent implements OnInit {
  saleList: Sale[] = [];
  detailSale = null;
  saleDialog: SaleNewDialogComponent;

  viewReport = false;

  constructor(private saleService: SaleService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public search() {
    return this.saleService.searchWithSale().subscribe(result => {
      this.saleList = result;
    });
  }

  public showDetail(id) {
    return this.saleService.byId(id).subscribe(sale => {
      this.detailSale = sale;
      console.log(this.detailSale);
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

  public saleReport() {
    this.detailSale = null;
    this.saleList = [];
    this.viewReport = !this.viewReport
  }

  public save() {
    this.saleService.save(this.detailSale).subscribe(status => {
      window.alert('Success');
    });
  }

}
