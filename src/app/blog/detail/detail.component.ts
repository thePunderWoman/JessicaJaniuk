import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { TitleService } from '../../services/title/title.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  post: Post = new Post();
  show = false;

  constructor(private postService: PostService, private titleService: TitleService, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
  }

  ngOnInit() {
    const year = this.route.snapshot.params['year'];
    const month = this.route.snapshot.params['month'];
    const day = this.route.snapshot.params['day'];
    const key = this.route.snapshot.params['key'];
    this.postService.getByKeyAndDate(year, month, day, key).subscribe(this.populatePost);
  }

  populatePost(data): void {
    this.post = data.json().data;
    this.show = true;
    this.titleService.setTitle(this.post.title);
  }
}
