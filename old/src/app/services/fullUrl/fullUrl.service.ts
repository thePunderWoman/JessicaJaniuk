import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable()
export class FullUrlService {
  baseUrl = environment.baseUrl;
  constructor(private location: Location) {}

  url(): string {
    return `${this.baseUrl}${this.location.path()}`;
  }
}
