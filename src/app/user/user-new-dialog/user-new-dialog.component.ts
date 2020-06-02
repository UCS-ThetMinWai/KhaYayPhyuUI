import {Component, OnInit} from '@angular/core';
import {User} from '../../domain/user';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.css']
})
export class UserNewDialogComponent implements OnInit {
  user: User;

  constructor(private dialogRef: MatDialogRef<User>) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.user);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
