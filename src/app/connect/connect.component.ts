import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';
import { ConnectionService } from '../services/connection/connection.service';
import { Connection } from '../models/connection';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  items: Connection[] = [];
  body: string = '';
  title: string = '';
  show: boolean = false;

  constructor(private connectionService: ConnectionService,
    private pageService: PageService, private titleService: TitleService) {
    this.handlePage = this.handlePage.bind(this);
    this.handleConnections = this.handleConnections.bind(this);
  }

  ngOnInit() {
    this.titleService.setTitle('Connect');
    this.pageService.getByKey('connect').subscribe(this.handlePage);
    this.connectionService.getAll().subscribe(this.handleConnections);
  }

  handlePage(data) {
    let page = data.json();
    this.body = page.data.content;
    this.title = page.data.title;
    this.show = true;
  }

  handleConnections(data) {
    this.items.push.apply(this.items, data.json().data);
  }
}
