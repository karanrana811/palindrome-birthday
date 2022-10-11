const button = document.querySelector(".show-button");
const input = document.querySelector("#date-input");
const message = document.querySelector(".message");

function reverseString(str) {
    var reversedStr = str.split('').reverse().join('');
    return reversedStr;
}

function checkForPalindrome(str) {
    var reversedStr = reverseString(str);
    if (str === reversedStr) {
        return true;
    } else {
        return false;
    }
}

function dateToString(date) {
    var day = date.day;
    var dayStr = day.toString();
    if (date.day < 10) {
        dayStr = '0' + dayStr;
    } else {
        dayStr = dayStr;
    }
    var month = date.month;
    var monthStr = month.toString();
    if (date.month < 10) {
        monthStr = '0' + monthStr;
    } else {
        monthStr = monthStr;
    }
    var year = date.year;
    var yearStr = year.toString();
    var dateStr = {
        day: dayStr,
        month: monthStr,
        year: yearStr
    }
    return dateStr;


}

function dateVariations(date) {
    var dateStr = dateToString(date);
    var toBeSlicedYear = dateStr.year;
    var yy = toBeSlicedYear.slice(-2);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + yy;
    var mmddyy = dateStr.month + dateStr.day + yy;
    var yymmdd = yy + dateStr.month + dateStr.day;
    var dateVariationArray = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateVariationArray;
}

function checkPalindromeForDates(date) {
    var dateVariationArray = dateVariations(date)
    console.log(dateVariationArray);
    var palindromeOrNot = []
    for (var i = 0; i < dateVariationArray.length; i++) {
        if (checkForPalindrome(dateVariationArray[i])) {
            palindromeOrNot[i] = true;
        } else {
            palindromeOrNot[i] = false;
        }
    }
    return palindromeOrNot;
}

function findNextDate(date) {
    var nextDay = date.day + 1;
    var nextMonth = date.month;
    var nextYear = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // for (var i=0; i < daysInMonth.length; i++) {
    if (nextDay > daysInMonth[nextMonth - 1]) {
        nextDay = 1;
        nextMonth = nextMonth + 1;
    } else {
        nextMonth = nextMonth
    }
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear = nextYear + 1
    } else {
        nextYear = nextYear
    }
    var nextDate = {
        day: nextDay,
        month: nextMonth,
        year: nextYear
    }
    return nextDate;
}


function findNextPalindrome(date) {
    var palindromeOrNot = checkPalindromForDates(date);
    for (var i; i < palindromeOrNot.length; i++) {
        if (palindromeOrNot[i] === true) {
            console.log('Your birthday is a palindrome!')
        } else {

        }
    }
}

var date = {
    day: 28,
    month: 4,
    year: 2004
}

console.log(findNextDate(date))

