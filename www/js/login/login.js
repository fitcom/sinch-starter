/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
    .controller('LoginCtrl', function ($scope, Core) {


        $scope.$watchGroup([function () {
            return document.getElementById('username').value;
        }, function () {
            return document.getElementById('password').value;
        }], function (newVal) {
            $scope.ready = !!(newVal[0].length > 3 && newVal[1].length > 4);
        });


        $scope.login = function (username, password) {
            Core.userLogin(username, password);
        };

    });