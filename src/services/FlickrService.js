class FlickrService {
	constructor($http) {
		this.$http = $http;
		this.flickrKey = '9a100b5c65faf16b33e3e42c55be6145';
		this.flickrUser = '116218833@N05';
		this.flickrURL = `https://api.flickr.com/services/rest/?format=json&user_id=${this.flickrUser}&api_key=${this.flickrKey}&method=`;
	}

	getAlbums(successCallback, errorCallback) {
		return this.$http.get(`${this.flickrURL}flickr.photosets.getList&primary_photo_extras=url_t,url_s,url_m,url_o,path_alias,media`).then(successCallback, errorCallback);
	}

	getPhotos(albumId, successCallback, errorCallback) {
		return this.$http.get(`${this.flickrURL}flickr.photosets.getPhotos&photoset_id=${albumId}&extras=url_sq,url_t,url_s,url_m,url_o`).then(successCallback, errorCallback);	
	}
}

register('Janiuk.services').service('FlickrService', FlickrService);