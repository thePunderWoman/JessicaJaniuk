import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MetaService } from './meta.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

describe('MetaService', () => {
  let metaMock, titleMock, routerMock;
  const metaTag = document.createElement('meta') as HTMLMetaElement;

  metaMock = {
    updateTag: jasmine.createSpy('updateTag'),
    removeTagElement: jasmine.createSpy('removeTagElement')
  };
  metaMock.updateTag.and.returnValue(metaTag);
  titleMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  routerMock = {
    events: {
      subscribe: jasmine.createSpy('subscribe')
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MetaService,
        { provide: Meta, useValue: metaMock },
        { provide: Title, useValue: titleMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  }));

  it('should ...', inject([MetaService], (metaService: MetaService) => {
    expect(metaService).toBeTruthy();
    expect(routerMock.events.subscribe).toHaveBeenCalledWith(metaService.cleanOnNavigation);
  }));

  it('should set defaults', inject([MetaService], (service: MetaService) => {
    spyOn(service, 'setTitle');
    service.setDefaults();
    expect(service.setTitle).toHaveBeenCalledWith('Welcome');
    expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:title', content: 'Welcome to Jessica Janiuk\'s personal website'});
    expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:image', content: 'https://jessicajaniuk.com/assets/site-image.png'});
    expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:type', content: 'website' });
    expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:url', content: 'https://jessicajaniuk.com/'});
    expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:description',
      content: 'Nerdfighter. Developer. Writer. Droid Builder Gamer. Photographer. Historical Fencer. Speaker. Trans. Lesbian. Woman.' });
  }));

  it('should clean on navigation start', inject([MetaService, Router], (service: MetaService) => {
    spyOn(service, 'cleanTags');
    const ev = new NavigationStart(5, '/stuff');
    service.cleanOnNavigation(ev);
    expect(service.cleanTags).toHaveBeenCalled();
  }));

  it('should not clean on any other navigation type', inject([MetaService, Router], (service: MetaService) => {
    spyOn(service, 'cleanTags');
    const ev = new NavigationEnd(5, '/stuff', '/things');
    service.cleanOnNavigation(ev);
    expect(service.cleanTags).not.toHaveBeenCalled();
  }));

  it('should set title', inject([MetaService], (service: MetaService) => {
    service.setTitle('new title');
    expect(titleMock.setTitle).toHaveBeenCalledWith('new title | Jessica Janiuk');
  }));

  it('should set tag', inject([MetaService], (service: MetaService) => {
    const tag = { property: 'test', content: 'stuff'};
    service.setTag(tag);
    expect(metaMock.updateTag).toHaveBeenCalledWith(tag);
  }));

  it('should set page tag', inject([MetaService], (service: MetaService) => {
    const tag = { property: 'test', content: 'stuff'};
    service.setPageTag(tag);
    expect(metaMock.updateTag).toHaveBeenCalledWith(tag);
    expect(service.metaTags[0]).toBe(metaTag);
  }));

  it('should clean tags', inject([MetaService], (service: MetaService) => {
    spyOn(service, 'setDefaults');
    service.metaTags = [metaTag];
    service.cleanTags();
    expect(metaMock.removeTagElement).toHaveBeenCalledWith(metaTag);
    expect(service.setDefaults).toHaveBeenCalled();
  }));
});
