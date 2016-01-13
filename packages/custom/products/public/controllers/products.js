 'use strict';

/* jshint -W098 */
angular.module('mean.products').controller('ProductsController', ['$scope', 'Global', 'Products',
  function($scope, Global, Products) {
    $scope.global = Global;
    $scope.package = {
      name: 'products'
    };

      $scope.create = function() {
              var product = new Products($scope.product);

              product.$save(function(response) {
                  $location.path('articles/' + response._id);
              });

              $scope.article = {};
      };

  }
]);
