/**
 * Created by Henry on 01.03.17.
 */
let workLength = 25; // ToDo: decide if millisecond or seconds
let breakLength = 5; // ToDo: decide if millisecond or seconds

let working = true;
let isRunning = false;

let countdown;
let timer;
let remainingInMilliseconds;
let start;

/*let start = new Date();
 console.log(start);*/

$(document).ready(function () {
    $("#work-length").children().click(function () {
        changeWorkLength($(this).attr("value"));
    });
    $("#break-length").children().click(function () {
        changeBreakLength($(this).attr("value"));
    });
    $("#start-stop").click(function () {
        runningSwitcher();
        /*stop();*/
    })
});

/*function stop() {
 let end = new Date();
 console.log(start - end);
 }*/

function changeWorkLength(operator) { //ToDo: add time maximum and minimum
    if (operator === "+") {
        workLength++;
    }
    else {
        workLength--;
    }
    $("#display-work").html(workLength);
}

function changeBreakLength(operator) { //ToDo: add time maximum and minimum
    if (operator === "+") {
        breakLength++;
    }
    else {
        breakLength--;
    }
    $("#display-break").html(breakLength);
}

function runningSwitcher() { //ToDo: clock, Timer Object?
    if (!isRunning) {
        isRunning = true;
        if (working) {
            start = new Date();
            countdown = window.setTimeout(timeOver, workLength * 60 * 1000);
            timer = window.setInterval(changeProgress, (workLength * 60 * 1000) / 60);
        }
        else {
            countdown = window.setTimeout(timeOver, breakLength * 60 * 1000);
            timer = window.setInterval(changeProgress, (breakLength * 60 * 1000) / 60);
        }
    }
    else {
        isRunning = false;
        if (working) {
            remainingInMilliseconds = (workLength * 60 * 1000) - (Math.abs(start - new Date()));
            window.clearTimeout(countdown);
            window.clearInterval(timer);
        }
        else {

        }
    }
}

function timeOver() { //ToDo: change working

}

function changeProgress() {

}

