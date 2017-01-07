import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Page } from '../../models/page';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  pages: FirebaseListObservable<Page[]>;
  key: string;

  constructor(private af: AngularFire, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    this.deletePage = this.deletePage.bind(this);
  }

  ngOnInit() {
    this.pages = this.af.database.list('/pages');
  }

  confirmDelete(key) {
    this.key = key;
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(this.deletePage);
  }

  deletePage(result) {
    if (result) {
      this.af.database.object(`/pages/${this.key}`).remove();
    }
    this.key = undefined;
  }
}
