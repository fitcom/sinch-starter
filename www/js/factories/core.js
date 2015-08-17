/**
 * Created by Osei Fortune on 8/17/15.
 */
angular.module('sinch-starter')
    .factory('Core', function ($q, $state,$rootScope,$interval) {


        var sinchClient = new SinchClient({
            applicationKey: 'Your-App-Key',
            capabilities: {calling: true},
            supportActiveConnection: true
        });

        var incallListeners = {
            onCallProgressing: function (call) {
                console.log(call);
                //   $('audio#ringback').prop("currentTime",0); //Ensure ringback start from beginning
                //  $('audio#ringback').trigger("play"); //Play ringback when call is progressing
            },
            onCallEstablished: function (call) {
                console.log(call);
                $rootScope.inCall = true;
                $interval(function () {
                    $rootScope.currentCallTimer = new Date().getTime() - new Date(call.timeProgressing).getTime();
                },500);
                //  $('audio#ringback').trigger("pause"); //End ringback
                //  $('audio#incoming').attr('src', call.incomingStreamURL); //Connect incoming stream to audio element
            },
            onCallEnded: function (call) {
                console.log(call.timeEnded);
                $rootScope.user = '';
                $rootScope.inCall = false;
                $state.go('phone');
                //   $('audio#ringback').trigger("pause"); //End the ringback
                //   $('audio#incoming').attr('src', ''); //Ensure no incoming stream is playing
                //Optional: Enable user interface to make another call
            }
        };


        var outcallListeners = {
            onCallProgressing: function (call) {
                console.log(call);
              //  $state.go('voice',{id:$rootScope.user});
                //  call.answer();
                //   $('audio#ringback').prop("currentTime",0); //Ensure ringback start from beginning
                //  $('audio#ringback').trigger("play"); //Play ringback when call is progressing
            },
            onCallEstablished: function (call) {
                console.log(call);
                $interval(function () {
                    $rootScope.currentCallTimer = new Date().getTime() - new Date(call.timeProgressing).getTime();
                },500);
                //  $('audio#ringback').trigger("pause"); //End ringback
                //  $('audio#incoming').attr('src', call.incomingStreamURL); //Connect incoming stream to audio element
            },
            onCallEnded: function (call) {
                console.log(call);
                $rootScope.user = '';
                $rootScope.inCall = false;
                $state.go('phone');
                //   $('audio#ringback').trigger("pause"); //End the ringback
                //   $('audio#incoming').attr('src', ''); //Ensure no incoming stream is playing
                //Optional: Enable user interface to make another call
            }
        };

        var userLogin = function (username, password) {
            sinchClient.start({username: username, password: password})
                .then(function (success) {
                    sinchClient.startActiveConnection();
                    var callClient = sinchClient.getCallClient();
                    callClient.addEventListener({
                        onIncomingCall: function (incomingCall) {
                            $rootScope.call = incomingCall;
                            $rootScope.direction = 'in';
                            $rootScope.user = incomingCall.fromId;
                            incomingCall.addEventListener(incallListeners);
                            if(incomingCall.getHeaders() === 'voice'){
                                $state.go('voice',{id:$rootScope.user});
                            }

                        }
                    });

                    $state.go('phone');
                }).fail(function (err) {
                    console.log(err)
                })
        };

        var userSignup = function (username, password) {
            sinchClient.newUser({username: username, password: password})
                .then(sinchClient.start.bind(sinchClient))
                .then(function (success) {
                    sinchClient.startActiveConnection();
                    var callClient = sinchClient.getCallClient();
                    callClient.addEventListener({
                        onIncomingCall: function (incomingCall) {
                            $rootScope.user = incomingCall.fromId;
                            $rootScope.direction = 'in';
                            incomingCall.addEventListener(incallListeners);
                            if(incomingCall.getHeaders() === 'voice'){
                                $state.go('voice',{id:$rootScope.user});
                            }

                        }
                    });

                    $state.go('phone');
                }).fail(function (err) {
                    console.log(err)
                })
        };

        var voiceCall = function (user) {
            var callClient = sinchClient.getCallClient();
            $rootScope.user = user;
            var call = callClient.callUser(user,'voice');
            call.addEventListener(outcallListeners);
            $rootScope.direction = 'out';
            $rootScope.call = call;
            $rootScope.inCall = true;
            $state.go('voice',{id:$rootScope.user});
        };


        return {
            userLogin: userLogin,
            userSignup:userSignup,
            voiceCall: voiceCall
        }
    });