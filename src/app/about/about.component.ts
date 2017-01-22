import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  body: string = '';
  title: string = '';
  show: boolean = false;

  constructor(private pageService: PageService, private titleService: TitleService) {
    this.handlePage = this.handlePage.bind(this);
  }

  handlePage(data) {
    let page = data.json();
    this.body = page.data.content;
    this.title = page.data.title;
    this.show = true;
  }

  ngOnInit() {
    this.titleService.setTitle('About Me');
    this.pageService.getByKey('aboutme').subscribe(this.handlePage);
  }

}
