import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-r2d2',
  templateUrl: './r2d2.component.html',
  styleUrls: ['./r2d2.component.scss']
})
export class R2d2Component implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('R2-D2 | Jessica Janiuk');
  }

}
