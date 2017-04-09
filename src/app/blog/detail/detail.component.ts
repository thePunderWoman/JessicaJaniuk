import { Component, OnInit } from '@angular/core';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  post: Post = new Post();
  show = false;

  constructor(private meta: MetaService, private route: ActivatedRoute, private fullUrl: FullUrlService) {
    this.route = route;
  }

  ngOnInit() {
    const data = this.route.snapshot.data['post'];
    const post = data.json().data;
    this.post = post;
    this.post.meta = post.Meta;
    this.show = true;
    this.setMetaTags();
  }

  setMetaTags() {
    this.meta.setTitle(this.post.title);
    this.meta.setTag('og:title', this.post.title);
    this.meta.setTag('og:type', 'article');
    this.meta.setTag('og:url', this.fullUrl.url());
    this.meta.setTag('article:published_time', this.post.publishDate.toString());
    this.meta.setTag('article:modified_time', this.post.publishDate.toString());
    this.meta.setTag('article:author', 'Jessica Janiuk');
    this.post.meta.forEach((tag) => {
      this.meta.setTag(tag.tag, tag.value);
    });
  }
}
