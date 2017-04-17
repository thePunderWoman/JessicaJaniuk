import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta/meta.service';
import { ActivatedRoute } from '@angular/router';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  show = false;
  title = '';
  photos: any = [];

  constructor(private meta: MetaService, private route: ActivatedRoute, private fullUrl: FullUrlService) {}

  ngOnInit() {
    const data = this.route.snapshot.data['album'];
    const photos = data.json();
    this.title = photos.photoset.title;
    this.photos.push.apply(this.photos, photos.photoset.photo);
    this.meta.setTitle(this.title);
    this.meta.setTag({ property: 'og:title', content: `Photography - ${this.title}` });
    this.meta.setTag({ property: 'og:url', content: this.fullUrl.url() });
    this.show = true;
  }
}
