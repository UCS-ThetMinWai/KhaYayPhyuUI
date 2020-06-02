import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../shared/customer.service';
import {Customer} from '../../domain/customer';
import {MatDialog} from '@angular/material/dialog';
import {CustomerNewDialogComponent} from '../customer-new-dialog/customer-new-dialog.component';

@Component({
  selector: 'app-customer-base',
  templateUrl: './customer-base.component.html',
  styleUrls: ['./customer-base.component.css']
})
export class CustomerBaseComponent implements OnInit {
  customerList: Customer[] = [];
  detailCustomer = null;
  customerDialog: CustomerNewDialogComponent;

  displayColumns: string[] = ['name'];

  constructor(private customerService: CustomerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public search() {
    this.customerService.searchWithCustomer().subscribe(result => {
      console.log('Result is ', result);
      this.customerList = result;
    });
  }

  public openCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerNewDialogComponent);
    dialogRef.afterClosed().subscribe((customer: Customer) => {
      if (customer == null) {
        return;
      }
      customer.id = 0;
      this.customerService.save(customer).subscribe(t => {
        console.log(t);
      });
    });
  }

  public showDetail(id) {
    this.customerService.byId(id).subscribe(customer => {
      this.detailCustomer = customer;
      console.log(this.detailCustomer);
    });
  }

  public remove(boId) {
    let index = 0;
    for (let i = 0; i < this.customerList.length; i++) {
      const customer = this.customerList[i];
      if (customer.boId === boId) {
        index = i;
        break;
      }
    }
    this.customerList.splice(index, 1);
    this.detailCustomer = null;
  }

  public save() {
    this.customerService.save(this.detailCustomer).subscribe(status => {
      window.alert('Success');
    });
  }

  public searchWithName(text) {
    this.customerService.byName(text).subscribe(customerList => {
      this.customerList = customerList;
    });
  }
}
