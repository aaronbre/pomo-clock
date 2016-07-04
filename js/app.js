var app = angular.module('clockApp', []);

var mainController;
mainController = app.controller('clockCtrl', function ($scope, $interval) {
    $scope.sessionLength = 25;
    $scope.breakLength = 5;
    $scope.sessionName = "session";
    $scope.timerString = $scope.sessionLength;

    var inSession = false;
    var seconds = $scope.sessionLength * 60;

    $scope.sessionChange = function (time) {
        if (!inSession) {
            $scope.sessionLength = $scope.sessionLength == 1 ? 1 : $scope.sessionLength + time;
            seconds = $scope.sessionLength * 60;
            $scope.timerString = $scope.sessionLength;
        }
    };
    $scope.breakChange = function (time) {
        if (!inSession) {
            $scope.breakLength = $scope.breakLength == 1 ? 1 : $scope.breakLength + time;
            if ($scope.sessionName == "break") {
                seconds = $scope.breakLength * 60;
                $scope.timerString = $scope.breakLength;
            }
        }
    };

    $scope.toggleTimer = function () {
        if (!inSession) {
            inSession = true;
            var timer = $interval(updateTimer, 1000);
        }
        else {
            $interval.cancel(timer);
            inSession = false;
        }

    }

    function updateTimer() {
        seconds -= 1;
        $scope.timerString = parseTimer(seconds);
        if (seconds < 0)
        {
            playSound($scope.sessionName);

            if ($scope.sessionName == 'session')
            {
                $scope.sessionName = 'break';
                seconds = $scope.breakLength * 60;
            }
            else 
            {
                $scope.sessionName = 'session';
                seconds = $scope.sessionLength *60;
            }

        }

    }


});

function playSound(name)
{
    if (name == 'session')
    {

    }
    else {

    }
}

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