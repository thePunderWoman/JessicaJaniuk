(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlickrService = function () {
	function FlickrService($http) {
		_classCallCheck(this, FlickrService);

		this.$http = $http;
		this.flickrKey = '9a100b5c65faf16b33e3e42c55be6145';
		this.flickrUser = '116218833@N05';
		this.flickrURL = 'https://api.flickr.com/services/rest/?format=json&user_id=' + this.flickrUser + '&api_key=' + this.flickrKey + '&method=';
	}

	_createClass(FlickrService, [{
		key: 'getAlbums',
		value: function getAlbums(successCallback, errorCallback) {
			return this.$http.get(this.flickrURL + 'flickr.photosets.getList&primary_photo_extras=url_t,url_s,url_m,url_o,path_alias,media').then(successCallback, errorCallback);
		}
	}, {
		key: 'getPhotos',
		value: function getPhotos(albumId, successCallback, errorCallback) {
			return this.$http.get(this.flickrURL + 'flickr.photosets.getPhotos&photoset_id=' + albumId + '&extras=url_sq,url_t,url_s,url_m,url_o').then(successCallback, errorCallback);
		}
	}]);

	return FlickrService;
}();

register('Janiuk.services').service('FlickrService', FlickrService);

},{}]},{},[1]);
