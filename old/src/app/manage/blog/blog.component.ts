import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Post } from '../../models/post';
import { MomentModule } from 'angular2-moment';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  posts: Post[] = [];
  key: number;
  page = 1;
  totalPosts = 0;
  perPage = 10;
  pages = 1;

  constructor(private postService: PostService,
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) {
    this.deletePost = this.deletePost.bind(this);
    this.populatePosts = this.populatePosts.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.processRoute = this.processRoute.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe(this.processRoute);
  }

  processRoute(params) {
    this.page = (params && params.page) ? Number(params.page) : 1;
    this.getPosts();
  }

  getPosts() {
    this.postService.getAll(this.page).subscribe(this.populatePosts, this.handleError);
  }

  populatePosts(data) {
    this.posts = [];
    const response = data.json().data;
    this.totalPosts = response.count;
    this.posts.push.apply(this.posts, response.posts);
    this.setPages();
  }

  setPages() {
    this.pages = Math.ceil(this.totalPosts / this.perPage);
  }

  handleError(err): void {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }

  confirmDelete(key) {
    this.key = key;
    const config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(this.deletePost);
  }

  deletePost(result) {
    if (result) {
      this.postService.remove(this.key).subscribe(this.handleDelete);
    }
  }

  handleDelete() {
    this.getPosts();
    this.key = undefined;
  }
}
