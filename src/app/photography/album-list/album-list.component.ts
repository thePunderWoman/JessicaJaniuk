import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../services/flickr.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums: any = [];
  show: boolean = false;

  constructor(private flickrService: FlickrService, private titleService: Title) {
    this.handleAlbums = this.handleAlbums.bind(this);
  }

  ngOnInit() {
    this.flickrService.getAlbums().subscribe( this.handleAlbums );
    this.titleService.setTitle('Photography | Jessica Janiuk');
  }

  handleAlbums(data) {
    let body = data.text().replace('jsonFlickrApi(', '');
    body = body.slice(0, -1);
    let bodyjson = JSON.parse(body);
    this.albums.push.apply(this.albums, bodyjson.photosets.photoset);
    this.show = true;
  }
}
