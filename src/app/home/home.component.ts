import { Component, OnInit } from '@angular/core';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private meta: MetaService) { }

  ngOnInit() {
    this.meta.setTitle('Welcome');
  }

}
