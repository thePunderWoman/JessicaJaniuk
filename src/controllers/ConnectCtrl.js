class ConnectCtrl {
	constructor(FirebaseService, $timeout) {
		this.$timeout = $timeout;
		this.content = "";
		this.show = false;
		this.update = this.update.bind(this);
		this.error = this.error.bind(this);

		FirebaseService.pages.once("value", this.update, this.error);			
	}

	update(data) {
		this.$timeout(() => {
			this.content = data.val().connect;
			this.show = true;
		}, 1);
	}

	error(errorObject) {
		console.log("The read failed: " + errorObject.code);
	}
}

register("Janiuk.controllers").controller('ConnectCtrl', ConnectCtrl);