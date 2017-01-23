import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public page: number;
  @Input() public pages: number;
  @Input() public route: string;
  pageNumbers: number[] = [];

  constructor(public router: Router) {
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      this.page = changes['page'].currentValue;
    }
    if (changes['pages']) {
      this.pages = changes['pages'].currentValue;
      this.setPageNumbers();
    }
  }

  ngOnInit() {
    this.setPageNumbers();
  }

  setPageNumbers(): void {
    this.pageNumbers = Array(this.pages).fill(1).map((x, i) => i + 1);
  }

  prevPage(): void {
    this.page = Math.max(this.page - 1, 1);
    this.router.navigate([`${this.route}${this.page}`]);
  }

  nextPage(): void {
    this.page = Math.min(this.page + 1, this.pages);
    this.router.navigate([`${this.route}${this.page}`]);
  }
}
