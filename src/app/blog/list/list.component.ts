import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Post } from '../../models/post';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  fbPosts: FirebaseListObservable<Post[]>;
  posts: Post[] = [];
  now: Date = new Date();

  constructor(private af: AngularFire, private titleService: TitleService) {
    this.populatePosts = this.populatePosts.bind(this);
  }

  ngOnInit() {
    this.fbPosts = this.af.database.list('/blog/post', {
      query: {
        orderByChild: 'PublishDate',
        endAt: this.now.toISOString()
      }
    });
    this.fbPosts.subscribe(this.populatePosts);
    this.titleService.setTitle('Blog');
  }

  populatePosts(data) {
    this.posts = data.filter((post) => {
      return post.Published;
    });
    this.posts.sort(this.sortPosts);
  }

  sortPosts(a, b) {
    return a.PublishDate > b.PublishDate ? -1 : a.PublishDate < b.PublishDate ? 1 : 0;
  }
}
