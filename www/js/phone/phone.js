/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
    .controller('PhoneCtrl', function (Core, $scope) {

        $scope.voiceCall = function (user) {
            Core.voiceCall(user);
        };

        $scope.$watch(function () {
            return document.getElementById('username').value;
        }, function (newVal) {
            $scope.ready = newVal.length > 3;
        })
    });