class PhotoCtrl {
	constructor(FirebaseService, FlickrService, $timeout) {
		this.albums = [];
		this.FlickrService = FlickrService;
		this.show = false;
		this.handleAlbums = this.handleAlbums.bind(this);

		this.init();
	}

	init() {
		this.FlickrService.getAlbums(this.handleAlbums);
	}

	handleAlbums(data) {
		var tempData = data.data.replace('jsonFlickrApi(','');
		tempData = tempData.slice(0, -1);
		var albums = JSON.parse(tempData);
		this.albums.push.apply(this.albums, albums.photosets.photoset);
		this.show = true;
	}
}

register("Janiuk.controllers").controller('PhotoCtrl', PhotoCtrl);