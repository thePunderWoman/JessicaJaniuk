import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Post } from '../../models/post';
import { MomentModule } from 'angular2-moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: FirebaseListObservable<Post[]>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.posts = this.af.database.list('/blog/post');
  }
}
