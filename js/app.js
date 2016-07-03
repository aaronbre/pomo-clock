var app = angular.module('clockApp', []);

var mainController;
mainController = app.controller('clockCtrl', function ($scope, $interval) {
    $scope.sessionLength = 25;
    $scope.breakLength = 5;
    $scope.sessionName = "session";
    $scope.timerLength = $scope.sessionLength;
    $scope.timerString = $scope.timerLength;

    var inSession = false;
    var seconds = $scope.sessionLength * 60;

    $scope.sessionChange = function (time) {
        if (!inSession) {
            $scope.sessionLength = $scope.sessionLength < 1 ? 1 : $scope.sessionLength + time;
            seconds = $scope.timerLength * 60;
            $scope.timerLength = $scope.sessionLength * 60;
        }
    };
    $scope.breakChange = function (time) {
        if (!inSession) {
            $scope.breakLength = $scope.breakLength < 1 ? 1 : $scope.breakLength + time;
            if ($scope.sessionName == "break")
                $scope.timerLength = $scope.breakLength * 60;
        }
    };

    $scope.toggleTimer = function () {
        var timer;
        if (!inSession) {
            timer = $interval(function () {
                updateTimer();
            }, 1000);
        }
        else {
            $interval.cancel(timer);
        }

    }

    function updateTimer() {
        seconds -= 1;
        $scope.timerString = parseTimer(seconds);
    }


});


function parseTimer(seconds) {
    console.log(seconds);
    var hours = Math.floor(seconds/3600);
    var minutes = Math.floor(seconds%3600/60);
    seconds = Math.floor(seconds%3600%60);
    console.log([hours,minutes,seconds]);
    var string = hours < 0 ? hours +":" : "";
    string = minutes > 0 ? string + minutes +":" : string += "";
    string = seconds < 10 ? string + "0" + seconds : string + seconds;
    return string;
}