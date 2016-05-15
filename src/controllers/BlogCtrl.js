class BlogCtrl {
	constructor($timeout) {
		this.show = false;
		$timeout(() => {
			this.show = true;
		}, 1);		
	}
}

register("Janiuk.controllers").controller('BlogCtrl', BlogCtrl);