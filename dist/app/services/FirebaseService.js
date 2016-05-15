(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FirebaseService = function FirebaseService() {
  _classCallCheck(this, FirebaseService);

  var root = new Firebase("https://resplendent-inferno-2474.firebaseio.com/");
  this.root = root;
  this.pages = root.child('pages');
  this.connect = root.child('connect');
};

register('Janiuk.services').service('FirebaseService', FirebaseService);

},{}]},{},[1]);
