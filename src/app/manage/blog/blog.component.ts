import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Post } from '../../models/post';
import { MomentModule } from 'angular2-moment';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  posts: FirebaseListObservable<Post[]>;
  key: string;

  constructor(private af: AngularFire, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    this.deletePost = this.deletePost.bind(this);
  }

  ngOnInit() {
    this.posts = this.af.database.list('/blog/post');
  }

  confirmDelete(key) {
    this.key = key;
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(this.deletePost);
  }

  deletePost(result) {
    if (result) {
      this.posts.remove(this.key);
    }
    this.key = undefined;
  }
}
