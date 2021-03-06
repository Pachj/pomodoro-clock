/**
 * Created by Henry on 01.03.17.
 */
!function () {
    let initialWorkLength = 25;
    let initialBreakLength = 5;

    let working = true;
    let running = false;


    let clock = undefined;
    let remainingTime = undefined;

    $(document).ready(function () {
        displayInitialClock();
        $("#display-work").html(initialWorkLength);
        $("#display-break").html(initialBreakLength);

        $("#work-buttons").children().click(function () {
            changeWorkLength($(this).attr("value"));
        });
        $("#break-buttons").children().click(function () {
            changeBreakLength($(this).attr("value"));
        });
        $("#start-resume").click(function () {
            runningSwitcher();
        });
        $("#reset").click(function () {
            resetPomodoroClock();
        });
    });

// changes the work period length and also displays it
    function changeWorkLength(operator) {
        let changed = false;
        if (!running) {
            if (operator === "+") {
                if (initialWorkLength < 60) {
                    initialWorkLength++;
                    changed = true;
                }
            }
            else if (operator === "-") {
                if (initialWorkLength > 1) {
                    initialWorkLength--;
                    changed = true;
                }
            }
            if (changed) {
                displayInitialClock();
                $("#display-work").html(initialWorkLength);
            }
        }
    }

// changes the break period length and also displays it
    function changeBreakLength(operator) {
        let changed = false;
        if (!running) {
            if (operator === "+") {
                if (initialBreakLength < 60) {
                    initialBreakLength++;
                    changed = true;
                }
            }
            else if (operator === "-") {
                if (initialBreakLength > 1) {
                    initialBreakLength--;
                    changed = true;
                }
            }
            if (changed) {
                $("#display-break").html(initialBreakLength);
            }
        }
    }

// let the timer run or pause it
    function runningSwitcher() {
        // check if the clock not is running
        if (!running) {
            running = true;
            $("#start-resume").html("Pause");
            $("#reset").fadeOut("slow");
            run();
        }
        else {
            running = false;
            $("#start-resume").html("Resume");
            $("#reset").fadeIn("slow");
            window.clearInterval(clock);
        }
    }

// runs a timer
    function run() {
        setRemainingTime();
        newClock();

        function timer() {
            // check if time elapsed
            if (remainingTime === 0) {
                window.clearInterval(clock);
                resetProgress();
                changePeriod();
            }
            // continue running timer
            else {
                remainingTime -= 1;
                displayClock();
                changeProgress();
            }
        }

        // change from work to break or from break to work and then calls newClock and setRemainingTime
        function changePeriod() {
            working = !working;
            setRemainingTime();
            newClock();
        }

        // creates a new clock
        function newClock() {
            clock = window.setInterval(timer, 1000);
        }

        // sets the remainingTime equals to initialWorkLength or initialBreakLength
        function setRemainingTime() {
            // change remainingTime to the actual period (work or break)
            if (remainingTime === undefined || remainingTime === 0) {
                if (working) {
                    remainingTime = initialWorkLength * 60;
                }
                else {
                    remainingTime = initialBreakLength * 60;
                }
            }
        }
    }

// displays the clock
    function displayClock() {
        // seconds and minutes as String to fill into the clock
        let time = [(remainingTime % 60).toString(), Math.floor(remainingTime / 60).toString()];

        for (let i = 0; i < time.length; i++) {
            // check if the time only has 1 digit
            if (time[i].length < 2) {
                time[i] = "0" + time[i];
            }
            // check if the time has 0 digits
            else if (time[i].length < 1) {
                time[i] = "00";
            }
        }
        $("#seconds").html(time[0]); // display the seconds
        $("#minutes").html(time[1]); // display the minutes
    }

// displays the clock when the site is fresh loaded or the user changes the work length
    function displayInitialClock() {
        let timeToDisplay = initialWorkLength;
        if (initialWorkLength < 10) {
            timeToDisplay = "0" + timeToDisplay;
        }
        $("#minutes").html(timeToDisplay);
    }

// resets the whole Pomodoro Clock
    function resetPomodoroClock() {
        if (!running) {
            clock = undefined;
            remainingTime = undefined;
            working = true;
            running = false;

            $("#minutes").html(displayInitialClock());
            $("#seconds").html("00");
            $("#display-work").html(initialWorkLength);
            $("#display-break").html(initialBreakLength);
            $("#start-resume").html("Start");

            resetProgress();
        }
    }

    function changeProgress() {
        let timeStep; // amount of seconds who are needed to increase the progress
        let periodLength; // period length in seconds
        let color; // the actual color as rgb value

        if (working) {
            timeStep = (initialWorkLength * 60) / 60;
            periodLength = initialWorkLength * 60;
            color = "9, 178, 203";
        }
        else {
            timeStep = (initialBreakLength * 60) / 60;
            periodLength = initialBreakLength * 60;
            color = "242, 27, 63";
        }

        // change the border color
        $("#circle, #action-box").css("border-color", "rgb(" + color + ")");

        // change the linear gradient
        for (let i = 1; i <= 60; i++) {
            if (periodLength - (i * timeStep) === remainingTime) {
                let newPrecentage = i * 1.66665;
                $("#progress-circle").css("background", "linear-gradient(0deg, rgb(" + color + ")" + newPrecentage + "%, " +
                    "rgb(255, 255, 255)" + newPrecentage + "%, rgb(255, 255, 255) 100%)");
                break;
            }
        }
    }

    // resets the progress
    function resetProgress() {
        $("#progress-circle").css("background", "linear-gradient(0deg, rgb(9, 178, 203) 0%, " +
            "rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)");
    }
}();
