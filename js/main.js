/**
 * Created by Henry on 01.03.17.
 */
//ToDo: display initial breakLength and workLength and the clock
let initialWorkLength = 25;
let initialBreakLength = 5;
let remainingWorkLength = initialWorkLength * 60; // in seconds
let remainingBreakLength = initialBreakLength * 60; // in seconds

let working = true;
let running = false;

let clock;

$(document).ready(function () {
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

// changes the work period length
function changeWorkLength(operator) { //ToDo: add time maximum and minimum, block change if running
    if (operator === "+") {
        if (initialWorkLength < 60) {
            initialWorkLength++;
            remainingWorkLength += 60;
        }
    }
    else if (operator === "-") {
        if (initialWorkLength > 1) {
            initialWorkLength--;
            remainingWorkLength -= 60;
        }
    }
    displayClock();
    $("#display-work").html(initialWorkLength);
}

// changes the break period length
function changeBreakLength(operator) { //ToDo: add time maximum and minimum, block change if running
    if (operator === "+") {
        if (initialBreakLength < 60) {
            initialBreakLength++;
            remainingBreakLength++;
        }
    }
    else if (operator === "-") {
        if (initialBreakLength > 1) {
            initialBreakLength--;
            remainingBreakLength--;
        }
    }
    $("#display-break").html(initialBreakLength);
}

function runningSwitcher() {
    if (!running) {
        running = true;
        if (working) {
            doWork();
        }
        else {
            doBreak();
        }
    }
    else {
        running = false;
        window.clearInterval(clock);
        console.log("RemainingWorkLength: " + remainingWorkLength + ", RemainingBreakLength: " + remainingBreakLength);
    }
}
//ToDo: doWork and doBreak in one function when I link remaining... with working
function doWork() {
    clock = window.setInterval(workClock, 1000);

    function workClock() {
        if (remainingWorkLength === 0) {
            window.clearInterval(clock);
            working = false;
            doBreak();
        }
        else {
            remainingWorkLength -= 1;
            console.log(remainingWorkLength);
            displayClock();
        }
    }
}

function doBreak() {
    clock = window.setInterval(breakClock, 1000);

    function breakClock() {
        if (remainingBreakLength === 0) {
            window.clearInterval(clock);
            working = true;
            doWork();
        }
        else {
            remainingBreakLength -= 1;
            console.log(remainingBreakLength);
            displayClock();
        }
    }
}

function displayClock() {
    let remainingTime;

    if (working) {
        remainingTime = remainingWorkLength;
    }
    else {
        remainingTime = remainingBreakLength;
    }

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
        minutes = "0" + seconds;
    }
    else if (seconds.length < 1) {
        minutes = "00";
    }
    $("#seconds").html(seconds); // display the seconds
}