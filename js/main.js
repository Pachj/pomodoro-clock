/**
 * Created by Henry on 01.03.17.
 */
let workLength = 25 * 60 * 1000; // in milliseconds
let breakLength = 5 * 60 * 1000; // in milliseconds

let working = true;
let isRunning = false;

let countdown;
let progress;
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

// changes the work period length
function changeWorkLength(operator) { //ToDo: add time maximum and minimum
    if (operator === "+") {
        workLength += 60000;
    }
    else {
        workLength -= 60000;
    }
    $("#display-work").html(workLength / 1000 / 60);
}

// changes the break period length
function changeBreakLength(operator) { //ToDo: add time maximum and minimum
    if (operator === "+") {
        breakLength += 60000;
    }
    else {
        breakLength -= 60000;
    }
    $("#display-break").html(breakLength / 1000 / 60);
}

function runningSwitcher() { //ToDo: clock, check TimeOut/Interval time, check if remaining > 0
    if (!isRunning) {
        isRunning = true;
        start = new Date();
        if (working) {
            countdown = window.setTimeout(timeOver, workLength);
            progress = window.setInterval(changeProgress, workLength / 60);
            timer = window.setInterval(clock, workLength / 1000);
        }
        else {
            countdown = window.setTimeout(timeOver, breakLength);
            progress = window.setInterval(changeProgress, breakLength / 60);
            timer = window.setInterval(clock, breakLength / 1000);
        }
    }
    else {
        isRunning = false;
        if (working) {
            remainingInMilliseconds = workLength - (Math.abs(start - new Date()));
            window.clearTimeout(countdown);
            window.clearInterval(progress);
            window.clearInterval(timer);
        }
        else {

        }
    }
}

function timeOver() { //ToDo: change let working

}

function changeProgress() {

}

function clock() {

}