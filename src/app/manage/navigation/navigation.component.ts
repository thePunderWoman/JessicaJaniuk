import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-manage-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class ManageNavigationComponent implements OnInit {

  constructor(public af: AngularFire) { }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
  }

}
