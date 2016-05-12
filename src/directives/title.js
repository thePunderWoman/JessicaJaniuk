register("Janiuk").directive('title', ['$rootScope', '$timeout', ($rootScope, $timeout) => {
    return {
      link: () => {
        var listener = (event, toState) => {
          $timeout(() => {
            $rootScope.title = (toState.data && toState.data.pageTitle) 
              ? toState.data.pageTitle 
              : 'Welcome';
          });
        };
        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
}]);