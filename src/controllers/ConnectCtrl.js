class ConnectCtrl {
	constructor(FirebaseService, $scope) {
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

	update(data) {
		this.content = data.val().connect;
		this.show = true;
		this.$scope.$digest();
	}

	loaded(data) {
		data.val().forEach((item) => {
			this.connections.push(item);
		})
		this.$scope.$digest();
	}

	error(errorObject) {
		console.log("The read failed: " + errorObject.code);
	}
}

register("Janiuk.controllers").controller('ConnectCtrl', ConnectCtrl);