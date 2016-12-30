import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  page: FirebaseObjectObservable<any>;
  body: string = '';
  show: boolean = false;

  constructor(af: AngularFire, private titleService: Title) {
    this.handlePage = this.handlePage.bind(this);
    this.page = af.database.object('/pages/about');
    this.page.subscribe(this.handlePage);
  }

  handlePage(snapshot) {
    this.body = snapshot.$value;
    this.show = true;
  }

  ngOnInit() {
    this.titleService.setTitle('About Me | Jessica Janiuk');
  }

}
