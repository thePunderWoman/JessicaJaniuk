import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();
  tag: string = '';
  id: number;
  saving: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.saveComplete = this.saveComplete.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPost();
  }

  getPost() {
    if (this.id) {
      this.postService.getById(this.id).subscribe(this.populatePost);
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  populatePost(data): void {
    let post = data.json().data;
    this.post.id = post.id;
    this.post.title = post.title;
    this.post.category = post.category;
    this.post.content = post.content;
    this.post.published = post.published;
    this.post.publishDate = post.publishDate;
    this.post.Tags = [];
    this.post.Tags.push.apply(this.post.Tags, post.Tags);
  }

  onSubmit(): void {
    if (this.id) {
      this.postService.update(this.id, this.post).subscribe(this.saveComplete);
    } else {
      this.postService.save(this.post).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    let response = data.json();
    this.id = response.data.id;
    this.saving = false;
  }

  addTag(): void {
    if (this.tag.trim() !== '' && !this.post.Tags.find((ptag) => { return ptag.toLowerCase() === this.tag.trim().toLowerCase(); })) {
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
