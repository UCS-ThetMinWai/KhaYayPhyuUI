import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from '../../shared/customer.service';
import {Customer} from '../../domain/customer';
import {MatDialog} from '@angular/material/dialog';
import {CustomerNewDialogComponent} from '../customer-new-dialog/customer-new-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ProductNewDialogComponent} from '../../Product/product-new-dialog/product-new-dialog.component';
import {EmitterVisitorContext} from '@angular/compiler';

@Component({
  selector: 'app-customer-base',
  templateUrl: './customer-base.component.html',
  styleUrls: ['./customer-base.component.css']
})
export class CustomerBaseComponent implements OnInit {
  customerList: Customer[] = [];
  detailCustomer = null;
  customerDialog: CustomerNewDialogComponent;
  editStatus = {};

  @Output()
  public searchResult = new EventEmitter<string>();

  constructor(private customerService: CustomerService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
        this.openSnackBar('Save', 'success!');
        console.log(t);
      }, error => {
        this.openSnackBar('Message', 'Error');
      });
    });
  }

  public showDetail(id) {
    console.log(id);
    this.customerService.byId(id).subscribe(customer => {
      this.detailCustomer = customer;
      const updatedIndex = this.findIndexOfCustomerFromList(customer);
      this.customerList[updatedIndex] = this.detailCustomer;
    });
  }

  public save() {
    this.customerService.save(this.detailCustomer).subscribe(status => {
      this.openSnackBar('Save', 'Success');
    }, error => {
      this.openSnackBar('Fail to ', 'Save');
    });
  }

  public searchWithName(text) {
    this.customerService.byName(text).subscribe(customerList => {
      this.customerList = customerList;
      console.log("here");
      this.searchResult.emit(this.customerList.length + ' found.');
    });
  }

  public remove(customer: Customer) {
    this.showWarning(() => {
      this.customerService.delete(customer).subscribe(status => {
        if (status) {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.removeCustomerFromList(customer);
        }
      });
    });
  }

  openSnackBar(message: string, action: string) {
    console.log('here');
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public show(elementName) {
    this.editStatus[elementName] = true;
  }

  public hideAndSave(elementName) {
    this.save();
    this.editStatus[elementName] = false;
  }

  public isEnableEdit(elementName) {
    return !this.editStatus[elementName];
  }

  public isDisabledEdit(elementName) {
    return !this.isEnableEdit(elementName);
  }

  private removeCustomerFromList(customer: Customer) {
    let index = this.findIndexOfCustomerFromList(customer);
    this.customerList.splice(index, 1);
    this.detailCustomer = null;
  }

  private findIndexOfCustomerFromList(customer: Customer) {
    for (let i = 0; i < this.customerList.length; i++) {
      const deleteCustomer = this.customerList[i];
      if (deleteCustomer.boId === customer.boId) {
        return i;
      }
    }
  }

  private showWarning(func) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        func();
      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'info',
          title: 'User cancel operation.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
