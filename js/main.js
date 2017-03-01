/**
 * Created by Henry on 01.03.17.
 */
let workLength = 25;
let breakLength = 5;


$(document).ready(function () {
    $("#work-length").children().click(function () {
        changeWorkLength($(this).attr("value"));
    });
    $("#break-length").children().click(function () {
        changeBreakLength($(this).attr("value"));
    });
});

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
