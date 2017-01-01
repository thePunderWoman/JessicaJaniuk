import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  page: FirebaseObjectObservable<any>;
  body: string = '';
  show: boolean = false;

  constructor(af: AngularFire, private titleService: TitleService) {
    this.handlePage = this.handlePage.bind(this);
    this.page = af.database.object('/pages/about');
    this.page.subscribe(this.handlePage);
  }

  handlePage(snapshot) {
    this.body = snapshot.$value;
    this.show = true;
  }

  ngOnInit() {
    this.titleService.setTitle('About Me');
  }

}
