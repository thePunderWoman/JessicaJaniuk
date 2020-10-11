import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  category: Category = new Category('', 0);
  id: number;
  saving = false;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.saveComplete = this.saveComplete.bind(this);
    this.populateCategory = this.populateCategory.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCategory();
  }

  getCategory() {
    if (this.id) {
      this.categoryService.getById(this.id).subscribe(this.populateCategory);
    }
  }

  populateCategory(data) {
    if (data.json().data) {
      this.category = data.json().data as Category;
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  onSubmit(): void {
    this.saving = true;
    if (this.id) {
      this.categoryService.update(this.id, this.category).subscribe(this.saveComplete);
    } else {
      this.categoryService.save(this.category).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    const response = data.json();
    this.id = response.data.id;
    this.saving = false;
  }}
