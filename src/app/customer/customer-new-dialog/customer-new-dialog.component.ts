import {Component, OnInit} from '@angular/core';
import {Customer} from '../../domain/customer';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-new-dialog',
  templateUrl: './customer-new-dialog.component.html',
  styleUrls: ['./customer-new-dialog.component.css']
})
export class CustomerNewDialogComponent implements OnInit {

  customer: Customer;


  constructor(private dialogRef: MatDialogRef<Customer>) {
    this.customer = new Customer();
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.customer);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
