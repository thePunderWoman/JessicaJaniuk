import { Component, OnInit } from '@angular/core';
import { MetaService } from '@nglibs/meta';
import { ActivatedRoute } from '@angular/router';
import { FullUrlService } from '../services/fullUrl/fullUrl.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
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
    this.meta.setTitle(page.data.title);
    this.meta.setTag('og:title', page.data.title);
    this.meta.setTag('og:type', 'profile');
    this.meta.setTag('og:url', this.fullUrl.url());
    this.meta.setTag('profile:first_name', 'Jessica');
    this.meta.setTag('profile:last_name', 'Janiuk');
    this.meta.setTag('profile:gender', 'female');
    page.data.Meta.forEach((tag) => {
      this.meta.setTag(tag.tag, tag.value);
    });
  }
}
