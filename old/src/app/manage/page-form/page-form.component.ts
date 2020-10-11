import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Page } from '../../models/page';
import { ActivatedRoute } from '@angular/router';
import { MetaEnum } from '../../models/MetaEnum';
import { MetaTag } from '../../models/MetaTag';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {
  page: Page = new Page('', '', '', []);
  id: number;
  saving = false;
  metaOptions: String[] = MetaEnum;
  public metaChoice: string = MetaEnum[0];
  public metaValue = '';

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
    const page = data.json().data;
    if (page) {
      this.page = page as Page;
      this.page.meta = page.Meta;
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

  addMeta(): void {
    if (this.metaChoice.trim() !== '' && this.metaValue.trim() !== '') {
      this.page.meta.push(new MetaTag(this.metaChoice, this.metaValue));
    }
    this.metaChoice = MetaEnum[0];
    this.metaValue = '';
  }

  removeMeta(meta): void {
    const ix = this.page.meta.findIndex((mtag) => { return mtag === meta; });
    if (ix > -1) {
      this.page.meta.splice(ix, 1);
    }
  }
}
