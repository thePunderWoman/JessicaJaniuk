import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  posts: FirebaseListObservable<Post[]>;
  fbPost: FirebaseObjectObservable<Post>;
  post: Post = new Post();
  tag: string = '';
  id: string = undefined;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  ngOnInit() {
    this.posts = this.af.database.list('/blog/post');
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.fbPost = this.af.database.object(`/blog/post/${this.id}`);
      this.fbPost.subscribe(this.populatePost);
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  populatePost(post): void {
    this.post.Title = post.Title;
    this.post.Category = post.Category;
    this.post.Content = post.Content;
    this.post.Published = post.Published;
    this.post.PublishDate = post.PublishDate;
    this.post.Tags = [];
    this.post.Tags.push.apply(this.post.Tags, post.Tags);
  }

  onSubmit(): void {
    if (this.id) {
      this.fbPost.set(this.post);
    } else {
      this.posts.push(this.post).then((value) => {
        this.id = value.key;
      });
    }
  }

  setContent(content): void {
    this.post.Content = content;
  }

  addTag(): void {
    if (this.tag.trim() !== '' && !this.post.Tags.find((ptag) => { return ptag.toLowerCase() === this.tag.toLowerCase(); })) {
      this.post.Tags.push(this.tag.trim());
    }
    this.tag = '';
  }

  removeTag(tag): void {
    let ix = this.post.Tags.findIndex((ptag) => { return ptag === tag; });
    if (ix > -1) {
      this.post.Tags.splice(ix, 1);
    }
  }
}
