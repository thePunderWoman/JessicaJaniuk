(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectCtrl = function () {
	function ConnectCtrl(FirebaseService, $scope) {
		_classCallCheck(this, ConnectCtrl);

		this.$scope = $scope;
		this.content = "";
		this.connections = [];
		this.show = false;
		this.update = this.update.bind(this);
		this.loaded = this.loaded.bind(this);
		this.error = this.error.bind(this);

		FirebaseService.pages.once("value", this.update, this.error);
		FirebaseService.connect.once("value", this.loaded, this.error);
	}

	_createClass(ConnectCtrl, [{
		key: "update",
		value: function update(data) {
			this.content = data.val().connect;
			this.show = true;
			this.$scope.$digest();
		}
	}, {
		key: "loaded",
		value: function loaded(data) {
			var _this = this;

			data.val().forEach(function (item) {
				_this.connections.push(item);
			});
			this.$scope.$digest();
		}
	}, {
		key: "error",
		value: function error(errorObject) {
			console.log("The read failed: " + errorObject.code);
		}
	}]);

	return ConnectCtrl;
}();

register("Janiuk.controllers").controller('ConnectCtrl', ConnectCtrl);

},{}]},{},[1]);
