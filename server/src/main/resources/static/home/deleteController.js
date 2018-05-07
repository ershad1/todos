angular.module('todoApp').controller('deleteController', ['$mdDialog', '$scope', '$q', '$resource', 'todos', function ($mdDialog, $scope, $q, $resource, todos) {
    'use strict';
    this.cancel = $mdDialog.cancel;

    function deleteDessert(todo, index) {
        var todoDelete = $resource('todos/:id');
        var deferred = todoDelete.remove({id: todo.id});

        deferred.$promise.then(function () {
            todos.splice(index, 1);
        });

        return deferred.$promise;
    }

    function onComplete() {
        $mdDialog.hide();
    }

    function error() {
        $scope.error = 'Invalid secret.';
    }

    this.delete = function deleteItem() {
        $q.all(todos.forEach(deleteDessert)).then(onComplete);
    };

}]);