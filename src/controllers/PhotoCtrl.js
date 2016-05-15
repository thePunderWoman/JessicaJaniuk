class PhotoCtrl {
	constructor(FirebaseService, FlickrService, $timeout) {
		this.$timeout = $timeout;
		this.content = "";
		this.albums = [];
		this.FlickrService = FlickrService;
		this.show = false;
		this.update = this.update.bind(this);
		this.error = this.error.bind(this);
		this.handleAlbums = this.handleAlbums.bind(this);

		FirebaseService.pages.once("value", this.update, this.error);
		this.init();
	}

	update(data) {
		this.$timeout(() => {
			this.content = data.val().photography;
			this.show = true;
		}, 1);
	}

	init() {
		this.FlickrService.getAlbums(this.handleAlbums);
	}

	error(errorObject) {
		console.log("The read failed: " + errorObject.code);
	}

	handleAlbums(data) {
		var tempData = data.data.replace('jsonFlickrApi(','');
		tempData = tempData.slice(0, -1);
		var albums = JSON.parse(tempData);
		this.albums.push.apply(this.albums, albums.photosets.photoset);
	}
}

register("Janiuk.controllers").controller('PhotoCtrl', PhotoCtrl);