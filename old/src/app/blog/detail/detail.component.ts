import { Component, OnInit } from '@angular/core';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { MetaService } from '../../services/meta/meta.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  post: Post = new Post();
  categoryName = '';
  show = false;

  constructor(private meta: MetaService, private route: ActivatedRoute, private fullUrl: FullUrlService) {
    this.route = route;
  }

  ngOnInit() {
    const data = this.route.snapshot.data['post'];
    const post = data.json().data;
    this.categoryName = post.Category.name;
    this.post = post;
    this.post.meta = post.Meta;
    this.show = true;
    this.setMetaTags();
  }

  setMetaTags() {
    this.meta.setTitle(this.post.title);
    this.meta.setTag({ property: 'og:title', content: this.post.title });
    this.meta.setTag({ property: 'og:type', content: 'article' });
    this.meta.setTag({ property: 'og:url', content: this.fullUrl.url() });
    this.meta.setPageTag({ property: 'article:published_time', content: this.post.publishDate.toString() });
    this.meta.setPageTag({ property: 'article:modified_time', content: this.post.publishDate.toString() });
    this.meta.setPageTag({ property: 'article:author', content: 'https://www.facebook.com/jessica.janiuk' });
    this.meta.setPageTag({ property: 'article:section', content: this.categoryName });
    this.meta.setPageTag({ property: 'og:description', content: '' });
    this.meta.setPageTag({ property: 'og:image', content: 'https://jessicajaniuk.com/assets/blog-post-image.png' });
    this.post.meta.forEach((tag) => {
      this.meta.setPageTag({ property: tag.tag, content: tag.value });
    });
  }
}
