import {Component, Input, OnInit} from '@angular/core';
import {Sale} from '../../domain/sale';
import {MatDialog} from '@angular/material/dialog';
import {SaleNewDialogComponent} from '../sale-new-dialog/sale-new-dialog.component';
import {SaleService} from '../../shared/sale.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @Input() sale: Sale;

  constructor(private dialog: MatDialog, private saleService: SaleService) {
  }

  ngOnInit(): void {
  }

  public update() {
    SaleNewDialogComponent.editDialog(this.dialog, this.sale).afterClosed().subscribe(sale => {
      if (sale == null) {
        return;
      }
      this.saleService.save(sale).subscribe(result => {
        console.log('here');
      });
    });
  }

}
