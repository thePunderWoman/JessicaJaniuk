import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  now: Date = new Date();
  show = false;
  page = 1;
  pages = 1;
  perPage = 10;
  totalPosts = 0;

  constructor(private postService: PostService, private titleService: TitleService, private route: ActivatedRoute) {
    this.populatePosts = this.populatePosts.bind(this);
    this.processRoute = this.processRoute.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe(this.processRoute);
    this.titleService.setTitle('Blog');
  }

  processRoute(params) {
    this.page = (params && params.page) ? Number(params.page) : 1;
    this.postService.getAllPublishedPersonal(this.page).subscribe(this.populatePosts);
  }

  populatePosts(data) {
    this.posts = [];
    const response = data.json().data;
    this.totalPosts = response.count;
    response.posts.forEach((post) => {
      const pst = new Post(post);
      this.posts.push(pst);
    });
    this.setPages();
    this.show = true;
  }

  setPages() {
    this.pages = Math.ceil(this.totalPosts / this.perPage);
  }
}
