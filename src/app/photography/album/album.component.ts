import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FlickrService } from '../../services/flickr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  show: boolean = false;
  title: string = '';
  photos: any = [];

  constructor(private flickrService: FlickrService, private titleService: Title, private route: ActivatedRoute) {
    this.handlePhotos = this.handlePhotos.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.flickrService.getPhotos(params['id']).subscribe(this.handlePhotos);
    });
  }

  handlePhotos(data) {
    this.show = true;
    let tempData = data.text().replace('jsonFlickrApi(', '');
    tempData = tempData.slice(0, -1);
    let photos = JSON.parse(tempData);
    this.title = photos.photoset.title;
    this.photos.push.apply(this.photos, photos.photoset.photo);
    this.titleService.setTitle(this.title + ' | Jessica Janiuk');
  }

}
