class LogoHeaderCtrl {
	/*@ngInject*/
	constructor($state) {
		this.$state = $state;
	}

	isNotHome() {
		return this.$state.current.name !== "app" && this.$state.current.name !== '';
	}

    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
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