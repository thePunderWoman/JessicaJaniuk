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
  show: boolean = false;

  constructor(private postService: PostService, private titleService: TitleService, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.postService.getById(id).subscribe(this.populatePost);
  }

  populatePost(data): void {
    this.post = data.json().data;
    this.show = true;
    this.titleService.setTitle(this.post.title);
  }
}
