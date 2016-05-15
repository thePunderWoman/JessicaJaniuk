class AlbumCtrl {
	constructor(FlickrService, $stateParams) {
		this.FlickrService = FlickrService;
		this.show = false;
		this.albumid = $stateParams.albumid;
		this.title = "";
		this.photos = [];
		this.handlePhotos = this.handlePhotos.bind(this);

		this.init();
	}

	init() {
		this.FlickrService.getPhotos(this.albumid, this.handlePhotos);
	}

	handlePhotos(data) {
		this.show = true;
		var tempData = data.data.replace('jsonFlickrApi(','');
		tempData = tempData.slice(0, -1);
		var photos = JSON.parse(tempData);
		this.title = photos.photoset.title;
		this.photos.push.apply(this.photos, photos.photoset.photo)
	}
}

register("Janiuk.controllers").controller('AlbumCtrl', AlbumCtrl);