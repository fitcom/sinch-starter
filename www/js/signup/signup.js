/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
    .controller('SignupCtrl', function ($scope, Core) {


        $scope.$watchGroup([function () {
            return document.getElementById('username').value;
        }, function () {
            return document.getElementById('password').value;
        }], function (newVal) {
            $scope.ready = !!(newVal[0].length > 3 && newVal[1].length > 4);
        });


        $scope.signup = function (username, password) {
            Core.userSignup(username, password);
        };

    });