import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  body: string = '';
  title: string = '';
  show: boolean = false;

  constructor(af: AngularFire, private pageService: PageService, private titleService: TitleService) {
    this.handlePage = this.handlePage.bind(this);
    this.items = af.database.list('/connect');
  }

  ngOnInit() {
    this.titleService.setTitle('Connect');
    this.pageService.getByKey('connect').subscribe(this.handlePage);
  }

  handlePage(data) {
    let page = data.json();
    this.body = page.data.content;
    this.title = page.data.title;
    this.show = true;
  }
}
