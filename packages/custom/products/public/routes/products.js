'use strict';

angular.module('mean.products').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('products example page', {
      url: '/products/example',
      templateUrl: 'products/views/index.html'
    });

    $stateProvider.state('List Product',{
        url: '/products/list',
        templateUrl:'products/views/list.html'
    })
  }
]);
