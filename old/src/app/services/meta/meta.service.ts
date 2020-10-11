import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class MetaService {
  metaTags: HTMLMetaElement[] = [];

  constructor(private router: Router, private meta: Meta, private title: Title) {
    this.cleanOnNavigation = this.cleanOnNavigation.bind(this);
    this.router.events.subscribe(this.cleanOnNavigation);
  }

  cleanOnNavigation(event) {
    if (event instanceof NavigationStart) {
      this.cleanTags();
    }
  }

  setDefaults() {
    this.setTitle('Welcome');
    this.meta.updateTag({ property: 'og:title', content: 'Welcome to Jessica Janiuk\'s personal website'});
    this.meta.updateTag({ property: 'og:image', content: 'https://jessicajaniuk.com/assets/site-image.png'});
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://jessicajaniuk.com/'});
    this.meta.updateTag({ property: 'og:description',
      content: 'Nerdfighter. Developer. Writer. Droid Builder Gamer. Photographer. Historical Fencer. Speaker. Trans. Lesbian. Woman.' });
  }

  setTitle(title) {
    this.title.setTitle(`${title} | Jessica Janiuk`);
  }

  setTag(tag) {
    this.meta.updateTag(tag);
  }

  setPageTag(tag) {
    this.metaTags.push(this.meta.updateTag(tag));
  }

  cleanTags() {
    this.metaTags.forEach((tag) => {
      this.meta.removeTagElement(tag);
    });
    this.setDefaults();
  }
}
