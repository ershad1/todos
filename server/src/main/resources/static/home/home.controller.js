angular.module('todoApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
    });
}])
    .controller('homeCtrl', ['$mdEditDialog', '$q', '$scope', '$timeout', '$resource', '$mdDialog', function ($mdEditDialog, $q, $scope, $timeout, $resource, $mdDialog) {
        'use strict';
        'use strict';
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        $scope.filter = {
            options: {
                debounce: 500
            }
        };


        $scope.query = {
            filter: '',
            size: '5',             // size
            sort: 'id,desc',       // sort
            page: 1                // page
        };

        var changeQuery = angular.copy($scope.query, changeQuery);
        changeQuery['page'] = $scope.query.page - 1;
        $scope.$watch('query', function (newValue, oldValue) {
            changeQuery['page'] = $scope.query.page - 1;

            // angular copy will preserve the reference of $scope.someVar
            // so it will not trigger another digest
            angular.copy($scope.query, changeQuery);
            changeQuery['page'] = $scope.query.page - 1;
        }, true);
        var todoResource = $resource('todos');


        function success(todos) {
            $scope.todos = todos;
        }

        $scope.getTodos = function () {
            $scope.promise = todoResource.get(changeQuery, success).$promise;
        };

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addItemController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'home/add-item-dialog.html'
            }).then($scope.getTodos);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {todos: $scope.selected},
                templateUrl: 'home/delete-dialog.html'
            }).then($scope.getTodos);
        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if ($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        var bookmark;

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }

            if (newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if (!newValue) {
                $scope.query.page = bookmark;
            }

            $scope.getTodos();
        });

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

    }]);




