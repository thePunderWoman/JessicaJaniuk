import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../services/flickr/flickr.service';
import { MetaService } from '../../services/meta/meta.service';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums: any = [];
  show = false;

  constructor(private flickrService: FlickrService, private meta: MetaService, private fullUrl: FullUrlService) {
    this.handleAlbums = this.handleAlbums.bind(this);
  }

  ngOnInit() {
    this.flickrService.getAlbums().subscribe( this.handleAlbums );
    this.meta.setTitle('Photography');
    this.meta.setTag({ property: 'og:title', content: 'Photography' });
    this.meta.setTag({ property: 'og:url', content: this.fullUrl.url() });
  }

  handleAlbums(data) {
    this.albums.push.apply(this.albums, data.json().photosets.photoset);
    this.show = true;
  }
}
