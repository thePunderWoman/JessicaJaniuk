import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-r2d2',
  templateUrl: './r2d2.component.html',
  styleUrls: ['./r2d2.component.scss']
})
export class R2d2Component implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('R2-D2');
  }

}
