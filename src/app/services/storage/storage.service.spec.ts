/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
  });

  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('should ...', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should add item to storage', inject([StorageService], (service: StorageService) => {
    service.set('test', 'value');
    expect(window.sessionStorage.getItem('test')).toBe('value');
  }));

  it('should get item from storage', inject([StorageService], (service: StorageService) => {
    window.sessionStorage.setItem('test', 'value');
    expect(service.get('test')).toBe('value');
  }));

  it('should clear all items in storage', inject([StorageService], (service: StorageService) => {
    service.set('test', 'value');
    service.set('item', 'things');
    service.clear();
    expect(service.get('test')).toBeNull();
    expect(service.get('item')).toBeNull();
  }));

  it('should remove item by key', inject([StorageService], (service: StorageService) => {
    service.set('test', 'value');
    service.remove('test');
    expect(service.get('test')).toBeNull();
  }));
});
