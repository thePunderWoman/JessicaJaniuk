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
    let id = this.route.snapshot.params['id'];
    this.flickrService.getPhotos(id).subscribe(this.handlePhotos);
  }

  handlePhotos(data) {
    this.show = true;
    let photos = data.json();
    this.title = photos.photoset.title;
    this.photos.push.apply(this.photos, photos.photoset.photo);
    this.titleService.setTitle(this.title + ' | Jessica Janiuk');
  }

}