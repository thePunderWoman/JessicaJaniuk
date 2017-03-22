import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Page } from '../../models/page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {
  page: Page = new Page('', '', '');
  id: number;
  saving = false;

  constructor(private pageService: PageService, private route: ActivatedRoute) {
    this.populatePage = this.populatePage.bind(this);
    this.saveComplete = this.saveComplete.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPage();
  }

  getPage() {
    if (this.id) {
      this.pageService.getById(this.id).subscribe(this.populatePage);
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  populatePage(data): void {
    if (data.json().data) {
      this.page = data.json().data as Page;
    }
  }

  onSubmit(): void {
    this.saving = true;
    if (this.id) {
      this.pageService.update(this.id, this.page).subscribe(this.saveComplete);
    } else {
      this.pageService.save(this.page).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    const response = data.json();
    this.id = response.data.id;
    this.saving = false;
  }
}
