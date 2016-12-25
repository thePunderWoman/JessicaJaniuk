import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  page: FirebaseObjectObservable<any>;
  body: string = '';
  show: boolean = false;

  constructor(af: AngularFire) {
    this.items = af.database.list('/connect');
    this.page = af.database.object('/pages/connect');
    this.page.subscribe(snapshot => {
      this.body = snapshot.$value;
      this.show = true;
    });
  }

  ngOnInit() {
  }

}
