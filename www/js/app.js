angular.module('sinch-starter', ['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/login');
      $stateProvider
          .state('login',{
            url:'/login',
            controller:'LoginCtrl',
            templateUrl:'js/login/login.html'
          })
          .state('phone',{
              url:'/phone',
              controller:'PhoneCtrl',
              templateUrl:'js/phone/phone.html'
          })
          .state('voice',{
              url:'/voice/:id',
              controller:'VoiceCtrl',
              templateUrl:'js/phone/voice.html'
          })
          .state('signup',{
              url:'/signup',
              controller:'SignupCtrl',
              templateUrl:'js/signup/signup.html'
          })
    })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
