import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullUrlService } from '../services/fullUrl/fullUrl.service';
import { Page } from '../models/page';
import { MetaService } from '../services/meta/meta.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  metaTags: HTMLMetaElement[] = [];
  body = '';
  title = '';
  show = false;

  constructor(private route: ActivatedRoute, private meta: MetaService, private fullUrl: FullUrlService) {
    this.route = route;
  }

  ngOnInit() {
    const data = this.route.snapshot.data['page'];
    const page = data.json();
    this.body = page.data.content;
    this.title = page.data.title;
    this.show = true;
    this.setMetaTags(page);
  }

  setMetaTags(page) {
    this.metaTags = page.data.Meta;
    this.meta.setTitle(page.data.title);
    this.meta.setTag({ property: 'og:title', content: page.data.title });
    this.meta.setTag({ property: 'og:type', content: 'profile' });
    this.meta.setTag({ property: 'og:url', content: this.fullUrl.url() });
    this.meta.setPageTag({ property: 'profile:first_name', content: 'Jessica' });
    this.meta.setPageTag({ property: 'profile:last_name', content: 'Janiuk' });
    this.meta.setPageTag({ property: 'profile:gender', content: 'female' });
    page.data.Meta.forEach((tag) => {
      this.meta.setPageTag({ property: tag.tag, content: tag.value });
    });
  }

}
