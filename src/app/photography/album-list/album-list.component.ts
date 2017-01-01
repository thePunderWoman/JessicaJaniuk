import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../services/flickr/flickr.service';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums: any = [];
  show: boolean = false;

  constructor(private flickrService: FlickrService, private titleService: TitleService) {
    this.handleAlbums = this.handleAlbums.bind(this);
  }

  ngOnInit() {
    this.flickrService.getAlbums().subscribe( this.handleAlbums );
    this.titleService.setTitle('Photography');
  }

  handleAlbums(data) {
    this.albums.push.apply(this.albums, data.json().photosets.photoset);
    this.show = true;
  }
}
