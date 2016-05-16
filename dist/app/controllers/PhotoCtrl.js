(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhotoCtrl = function () {
	function PhotoCtrl(FirebaseService, FlickrService, $timeout) {
		_classCallCheck(this, PhotoCtrl);

		this.albums = [];
		this.FlickrService = FlickrService;
		this.show = false;
		this.handleAlbums = this.handleAlbums.bind(this);

		this.init();
	}

	_createClass(PhotoCtrl, [{
		key: 'init',
		value: function init() {
			this.FlickrService.getAlbums(this.handleAlbums);
		}
	}, {
		key: 'handleAlbums',
		value: function handleAlbums(data) {
			var tempData = data.data.replace('jsonFlickrApi(', '');
			tempData = tempData.slice(0, -1);
			var albums = JSON.parse(tempData);
			this.albums.push.apply(this.albums, albums.photosets.photoset);
			this.show = true;
		}
	}]);

	return PhotoCtrl;
}();

register("Janiuk.controllers").controller('PhotoCtrl', PhotoCtrl);

},{}]},{},[1]);
