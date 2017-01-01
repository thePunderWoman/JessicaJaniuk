import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('404! Not Found');
  }
}
