class LogoHeaderCtrl {
	/*@ngInject*/
	constructor($state) {
		this.$state = $state;
	}

	isHome() {
		return this.$state.current.name === "app";
	}

}

register("Janiuk").component('logoheader', {
	templateUrl: '/app/views/logoheader.html',
	controller: LogoHeaderCtrl,
	controllerAs: "header",
 	bindings: {
    	'logoheader': '<'
  	}
});