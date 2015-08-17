/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
.controller('VoiceCtrl', function ($rootScope,$scope) {

        $scope.answer = function () {
            return $rootScope.call.answer();
        };

        $scope.hangup = function () {
            return $rootScope.call.hangup();
        };
    });