import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  post: Post = new Post();
  show: boolean = false;

  constructor(private af: AngularFire, private titleService: TitleService, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.af.database.object(`/blog/post/${id}`)
      .subscribe(this.populatePost);
  }

  populatePost(data: Post): void {
    this.post = data;
    this.show = true;
    this.titleService.setTitle(this.post.Title);
  }
}
