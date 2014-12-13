angular.module( 'app', [ 'ng', 'ngSanitize', 'ngAnimate' ] )
.controller( 'stageController', function() {} )
.config( function( $sceDelegateProvider ) {
  $sceDelegateProvider.resourceUrlWhitelist( [ 'self', /^(https?:)?\/\/olen\.tongal\.com\/.*/ ] );
} )
.directive( 'onResize', function( $window, $parse, $rootScope ) {
  return {
    link: function( $scope, $element, $attrs ) {

      var onResizeGetter = $parse( $attrs.onResize );

      var onResize = function( size ) {
        onResizeGetter( $scope, {
          width : size && typeof size.width  != 'undefined' ? size.width  : $element[0].getBoundingClientRect().width,
          height: size && typeof size.height != 'undefined' ? size.height : $element[0].getBoundingClientRect().height,
        } );
      };

      var scopeAppliedResize = function() { $rootScope.$apply( onResize ); };

      angular.element( $window ).bind( 'resize', scopeAppliedResize );
      $scope.$on( '$destroy', function() { angular.element( $window ).unbind( 'resize', scopeAppliedResize ); } );
      
      setTimeout( scopeAppliedResize );
    },
  };
} );