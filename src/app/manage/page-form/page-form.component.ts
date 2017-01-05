import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {
  fbPage: FirebaseObjectObservable<Page>;
  page: Page = new Page();
  id: string = undefined;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
    this.populatePage = this.populatePage.bind(this);
    this.setId = this.setId.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPage();
  }

  getPage() {
    if (this.id) {
      this.fbPage = this.af.database.object(`/pages/${this.id}`);
      this.fbPage.subscribe(this.populatePage);
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  populatePage(page): void {
    this.page.Title = page.Title;
    this.page.Content = page.Content;
  }

  onSubmit(): void {
    if (this.id) {
      this.fbPage.set(this.page);
    } else {
      this.af.database.list('/pages')
        .push(this.page)
        .then(this.setId);
    }
  }

  setId(value) {
    this.id = value.key;
  }
}
