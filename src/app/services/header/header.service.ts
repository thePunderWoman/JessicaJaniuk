import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class HeaderService {
  constructor(private storageService: StorageService) {}

  createAuthHeaders(): Headers {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.storageService.get('token')}`);
    return headers;
  }
}
