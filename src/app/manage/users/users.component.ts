import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  users: User[] = [];
  key: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) {
    this.populateUsers = this.populateUsers.bind(this);
    this.handleError = this.handleError.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  ngOnInit() {
    this.userService.getAll().subscribe(this.populateUsers, this.handleError);
  }

  populateUsers(data): void {
    this.users.push.apply(this.users, data.json().data);
  }

  handleError(err): void {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }

  confirmDelete(key) {
    this.key = key;
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(this.deleteUser);
  }

  deleteUser(result) {
    if (result) {
      this.userService.remove(this.key);
    }
    this.key = undefined;
  }

}
