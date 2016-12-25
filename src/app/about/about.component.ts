import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  page: FirebaseObjectObservable<any>;
  body: string = '';
  show: boolean = false;

  constructor(af: AngularFire) {
    this.page = af.database.object('/pages/about');
    this.page.subscribe(snapshot => {
      this.body = snapshot.$value;
      this.show = true;
    });
  }

  ngOnInit() {
  }

}
