import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  categories: Category[] = [];
  key: number;

  constructor(private categoryService: CategoryService,
    private authService: AuthService,
    public router: Router,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) {
    this.deleteCategory = this.deleteCategory.bind(this);
    this.populateCategories = this.populateCategories.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(this.populateCategories, this.handleError);
  }

  populateCategories(data) {
    this.categories.push.apply(this.categories, data.json().data);
  }

  hasPosts(value) {
    return Number(value) > 0;
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

    this.dialogRef.afterClosed().subscribe(this.deleteCategory);
  }

  deleteCategory(result) {
    if (result) {
      this.categoryService.remove(this.key).subscribe(this.handleDelete);
    }
  }

  handleDelete() {
    let ix = this.categories.findIndex((page) => page.id === this.key);
    this.categories.splice(ix, 1);
    this.key = undefined;
  }
}
