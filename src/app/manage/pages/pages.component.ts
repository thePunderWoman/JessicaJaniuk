import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Page } from '../../models/page';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  pages: Page[] = [];
  key: number;

  constructor(private pageService: PageService,
    private authService: AuthService,
    public router: Router,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) {
    this.deletePage = this.deletePage.bind(this);
    this.populatePages = this.populatePages.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  ngOnInit() {
    this.pageService.getAll().subscribe(this.populatePages, this.handleError);
  }

  populatePages(data) {
    this.pages.push.apply(this.pages, data.json().data);
  }

  handleError(err): void {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
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
      this.pageService.remove(this.key).subscribe(this.handleDelete);
    }
  }

  handleDelete() {
    let ix = this.pages.findIndex((page) => page.id === this.key);
    this.pages.splice(ix, 1);
    this.key = undefined;
  }

}
