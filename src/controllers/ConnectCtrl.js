class ConnectCtrl {
	constructor(FirebaseService, $timeout) {
		this.$timeout = $timeout;
		this.content = "";
		this.connections = [];
		this.show = false;
		this.update = this.update.bind(this);
		this.loaded = this.loaded.bind(this);
		this.error = this.error.bind(this);

		FirebaseService.pages.once("value", this.update, this.error);			
		FirebaseService.connect.once("value", this.loaded, this.error);			
	}

	update(data) {
		this.$timeout(() => {
			this.content = data.val().connect;
			this.show = true;
		}, 1);
	}

	loaded(data) {
		this.$timeout(() => {
			data.val().forEach((item) => {
				this.connections.push(item);
			})
		}, 1);
	}

	error(errorObject) {
		console.log("The read failed: " + errorObject.code);
	}
}

register("Janiuk.controllers").controller('ConnectCtrl', ConnectCtrl);