class FirebaseService {
	constructor() {
		var root = new Firebase("https://resplendent-inferno-2474.firebaseio.com/");
      	this.root = root;
      	this.pages = root.child('pages');
      	this.connect = root.child('connect');
	}
}

register('Janiuk.services').service('FirebaseService', FirebaseService);