import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Blog | Jessica Janiuk');
  }

}
