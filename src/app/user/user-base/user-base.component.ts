import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {ProductNewDialogComponent} from '../../Product/product-new-dialog/product-new-dialog.component';
import {Customer} from '../../domain/customer';
import {MatDialog} from '@angular/material/dialog';
import {UserNewDialogComponent} from '../user-new-dialog/user-new-dialog.component';
import {User} from '../../domain/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit {

  @Output()
  public searchResult = new EventEmitter<string>();

  userList = [];
  detailUser = null;
  userDialog: UserNewDialogComponent;
  editStatus = {};

  searchText = '';
  searchMessage = '';

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
      const updateIndex = this.findIndexOfUserFromList(user);
      this.userList[updateIndex] = this.detailUser;
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
        this.openSnackBar('Message', 'Success');
        console.log(t);
      }, error => {
        this.openSnackBar('Message', 'Error');
      });
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

  private removeUserFromList(user: User) {
    let index = this.findIndexOfUserFromList(user);
    this.userList.splice(index, 1);
    this.detailUser = null;
  }

  private findIndexOfUserFromList(user: User) {
    for (let i = 0; i < this.userList.length; i++) {
      const deleteUser = this.userList[i];
      if (deleteUser.boId === user.boId) {
        return i;
      }
    }
  }

  public remove(user: User) {
    this.showWarning(() => {
      this.userService.delete(user).subscribe(status => {
        if (status) {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.removeUserFromList(user);
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

  public save() {
    this.userService.save(this.detailUser).subscribe(status => {
      this.openSnackBar('Save', 'Success');
    }, error => {
      this.openSnackBar('Fail to ', 'Save');
    });
  }

  public searchWithName(text) {
    this.userService.byName(text).subscribe(userList => {
      this.userList = userList;
      this.searchResult.emit(userList.length + 'found.');
    });
  }

  private showWarning(func) {
    Swal.fire({
      title: 'Are you sure?',
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
