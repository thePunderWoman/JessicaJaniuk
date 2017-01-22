import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  user: User = new User('', '', '', '', false);
  id: number;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.saveComplete = this.saveComplete.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.populateUser = this.populateUser.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getUser();
  }

  getUser() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe(this.populateUser);
    }
  }

  populateUser(data) {
    if (data.json().data) {
      this.user = data.json().data as User;
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  onSubmit(): void {
    if (this.id) {
      this.userService.updateUser(this.id, this.user).subscribe(this.saveComplete);
    } else {
      this.userService.saveUser(this.user).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    let response = data.json();
    this.id = response.data.id;
    this.password = '';
    this.confirmPassword = '';
  }

  onChangePassword() {
    if (this.password.trim() !== ''
      && this.confirmPassword.trim() !== ''
      && this.password === this.confirmPassword) {
      this.userService.setPassword(this.id, this.password)
        .subscribe(this.saveComplete);
    }
  }
}
