/**
 * Created by Henry on 01.03.17.
 */
    // ToDo: remainingTime ev. as global variable
    // ToDo: remainingWorkLength and remainingBreakLength could then ev. be removed
let initialWorkLength = 10;
let initialBreakLength = 1;
let remainingWorkLength = initialWorkLength * 60; // in seconds
let remainingBreakLength = initialBreakLength * 60; // in seconds

let working = true;
let running = false;

let clock;

$(document).ready(function () {
    $("#minutes").html(initialWorkLength);
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

// changes the work period length
function changeWorkLength(operator) { //ToDo: (block changes if running)
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
function changeBreakLength(operator) { //ToDo: (block changes if running)
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
        run();
    }
    else {
        running = false;
        window.clearInterval(clock);
        console.log("RemainingWorkLength: " + remainingWorkLength + ", RemainingBreakLength: " + remainingBreakLength);
    }
}

function getRemainingTime() {
    if (working) {
        return remainingWorkLength;
    }
    else {
        return remainingBreakLength;
    }
}

function setRemainingTime(remainingTime) {
    if (working) {
        remainingWorkLength = remainingTime;
    }
    else {
        remainingBreakLength = remainingTime;
    }
}

function run() {
    newClock();

    function timer() {
        let remainingTime = getRemainingTime(); // ToDo: should not make every time a call

        if (remainingTime === 0) {
            window.clearInterval(clock);
            changeWorking();
        }
        else {
            remainingTime -= 1;
            setRemainingTime(remainingTime);
            console.log(remainingTime);
            displayClock();
        }
    }

    function newClock() {
        clock = window.setInterval(timer, 1000);
    }

    function changeWorking() {
        working = !working;
        console.log("Working changed to: " + working);
        newClock();
    }
}

function displayClock() {
    let remainingTime = getRemainingTime();

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