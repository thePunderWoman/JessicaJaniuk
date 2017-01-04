import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private provider: Storage;

  constructor() {
    this.provider = window.sessionStorage;
  }

  set(key: string, value: string): void {
    this.provider.setItem(key, value);
  }

  get(key: string): string {
    return this.provider.getItem(key);
  }

  clear(): void {
    this.provider.clear();
  }

  remove(key: string): void {
    this.provider.removeItem(key);
  }
}
