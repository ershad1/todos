angular.module('todoApp').controller('addItemController', ['$mdDialog', '$scope', '$resource', function ($mdDialog, $scope, $resource) {
    'use strict';

    this.cancel = $mdDialog.cancel;

    function success(response) {
        $mdDialog.hide(response);
    }

    this.addItem = function () {
        $scope.item.form.$setSubmitted();

        if ($scope.item.form.$valid) {
            var todoSave = $resource('todoSave');
            todoSave.save($scope.todo, success)
        }
    };

}]);