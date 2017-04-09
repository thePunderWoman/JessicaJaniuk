import { Component, OnInit } from '@angular/core';
import { MetaService } from '@nglibs/meta';
import { PageService } from '../services/page/page.service';
import { ConnectionService } from '../services/connection/connection.service';
import { Connection } from '../models/connection';
import { FullUrlService } from '../services/fullUrl/fullUrl.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  items: Connection[] = [];
  body = '';
  title = '';
  show = false;

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService,
    private meta: MetaService, private fullUrl: FullUrlService) {
    this.route = route;
    this.handleConnections = this.handleConnections.bind(this);
  }

  ngOnInit() {
    this.connectionService.getAll().subscribe(this.handleConnections);
    const data = this.route.snapshot.data['page'];
    const page = data.json();
    this.body = page.data.content;
    this.title = page.data.title;
    this.show = true;
    this.setMetaTags(page);
  }

  handleConnections(data) {
    this.items.push.apply(this.items, data.json().data);
  }

  setMetaTags(page) {
    this.meta.setTitle(page.data.title);
    this.meta.setTag('og:title', page.data.title);
    this.meta.setTag('og:url', this.fullUrl.url());
    page.data.Meta.forEach((tag) => {
      this.meta.setTag(tag.tag, tag.value);
    });
  }
}
