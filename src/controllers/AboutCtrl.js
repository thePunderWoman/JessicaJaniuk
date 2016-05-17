class AboutCtrl {
	constructor(FirebaseService, $scope) {
		this.$scope = $scope;
		this.content = "";
		this.show = false;
		this.update = this.update.bind(this);
		this.error = this.error.bind(this);

		FirebaseService.pages.once("value", this.update, this.error);	

	}

	update(data) {
		this.content = data.val().about;
		this.show = true;
		this.$scope.$digest();
	}

	error(errorObject) {
		console.log("The read failed: " + errorObject.code);
	}
}


register("Janiuk.controllers").controller('AboutCtrl', AboutCtrl);