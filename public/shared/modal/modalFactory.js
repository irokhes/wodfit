app.factory('modalFactory', ['$rootScope', '$q', '$uibModal', function ($rootScope,$q, $uibModal) {
    var _open = function (title, message) {
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'shared/modal/modalTpl.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.title = title;
                $scope.message = message;

                $scope.ok = function () {
                    modalInstance.close();
                    defer.resolve();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                    defer.reject();
                }
            }
        });
        return defer.promise ; 
    }
    return {
        open: _open
    };
}]);