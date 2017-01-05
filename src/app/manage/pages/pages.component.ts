import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Page } from '../../models/page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  pages: FirebaseListObservable<Page[]>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.pages = this.af.database.list('/pages');
  }

}
