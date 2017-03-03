/**
 * Created by Henry on 01.03.17.
 */
// ToDo: reset function
let initialWorkLength = 1;
let initialBreakLength = 1;

let working = true;
let running = false;

let clock;
let remainingTime;

$(document).ready(function () {
    $("#minutes").html(initialDisplayClock());
    $("#display-work").html(initialWorkLength);
    $("#display-break").html(initialBreakLength);

    $("#work-length").children().click(function () {
        changeWorkLength($(this).attr("value"));
    });
    $("#break-length").children().click(function () {
        changeBreakLength($(this).attr("value"));
    });
    $("#start-resume").click(function () {
        runningSwitcher();
    });
});

// changes the work period length and also displays it
function changeWorkLength(operator) { //ToDo: (block changes if running)
    if (operator === "+") {
        if (initialWorkLength < 60) {
            initialWorkLength++;
        }
    }
    else if (operator === "-") {
        if (initialWorkLength > 1) {
            initialWorkLength--;
        }
    }
    displayClock();
    $("#display-work").html(initialWorkLength);
}

// changes the break period length and also displays it
function changeBreakLength(operator) { //ToDo: (block changes if running)
    if (operator === "+") {
        if (initialBreakLength < 60) {
            initialBreakLength++;
        }
    }
    else if (operator === "-") {
        if (initialBreakLength > 1) {
            initialBreakLength--;
        }
    }
    $("#display-break").html(initialBreakLength);
}

// let the timer run or pause it
function runningSwitcher() {
    if (!running) {
        running = true;
        run();
    }
    else {
        running = false;
        window.clearInterval(clock);
    }
}

function run() {
    setRemainingTime();
    newClock();

    function timer() {

        if (remainingTime === 0) {
            window.clearInterval(clock);
            setRemainingTime();
            changeWorking();
        }
        else {
            remainingTime -= 1;
            console.log(remainingTime);
            displayClock();
        }
    }

    function newClock() {
        clock = window.setInterval(timer, 1000);
    }

    function setRemainingTime() {
        if (!remainingTime || remainingTime === 0) {
            if (working) {
                remainingTime = initialWorkLength * 60;
            }
            else {
                remainingTime = initialBreakLength * 60;
            }
        }
    }

    function changeWorking() {
        working = !working;
        console.log("Working changed to: " + working);
        newClock();
    }
}

// displays the clock
function displayClock() {
    let minutes = Math.floor(remainingTime / 60).toString(); // minutes of the actual remaining as String
    let seconds = (remainingTime % 60).toString(); // seconds of the actual remaining as String

    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }
    else if (minutes.length < 1) {
        minutes = "00";
    }
    $("#minutes").html(minutes); // display the minutes

    if (seconds.length < 2) {
        seconds = "0" + seconds;
    }
    else if (seconds.length < 1) { // ToDo: could ev. be removed
        seconds = "00";
    }
    $("#seconds").html(seconds); // display the seconds
}

function initialDisplayClock() {
    if (initialWorkLength < 10) {
        return "0" + initialWorkLength;
    }
    return initialWorkLength;
}