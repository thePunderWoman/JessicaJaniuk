import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class HeaderService {
  constructor(private storageService: StorageService) {}

  createAuthHeaders(): Headers {
    let headers = new Headers();
    let tokenData = JSON.parse(this.storageService.get('token'));
    headers.append('Authorization', `Bearer ${tokenData.token}`);
    return headers;
  }
}
