import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private titleService: TitleService, private authService: AuthService) { }

  ngOnInit() {
    this.titleService.setTitle('Blog');
  }

  showAdd(): boolean {
    return this.authService.isAdmin();
  }
}
