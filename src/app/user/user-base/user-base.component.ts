import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {ProductNewDialogComponent} from '../../Product/product-new-dialog/product-new-dialog.component';
import {Product} from '../../domain/product';
import {MatDialog} from '@angular/material/dialog';
import {UserNewDialogComponent} from '../user-new-dialog/user-new-dialog.component';
import {User} from '../../domain/user';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit {
  userList = [];
  detailUser = null;
  userDialog: UserNewDialogComponent;

  searchText = '';
  searchMessage = '';

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public search() {
    this.userService.searchWithUser().subscribe(result => {
      console.log('Result is ', result);
      this.userList = result;
    });
  }

  public showDetail(id) {
    this.userService.byId(id).subscribe(user => {
      this.detailUser = user;
      console.log(this.detailUser);
    });
  }

  public openUserDialog() {
    const dialogRef = this.dialog.open(UserNewDialogComponent);
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user == null) {
        return;
      }

      user.id = 0;
      this.userService.save(user).subscribe(t => {
        console.log(t);
      });
    });
  }

  public remove(boId) {
    let index = 0;
    for (let i = 0; i < this.userList.length; i++) {
      const customer = this.userList[i];
      if (customer.boId === boId) {
        index = i;
        break;
      }
    }
  }

  public save() {
    this.userService.save(this.detailUser).subscribe(status => {
      window.alert('Success');
    });
  }

  public searchWithName(text) {
    this.userService.byName(text).subscribe(userList => {
      this.userList = userList;
    });
  }

}
