const button = document.querySelector(".show-button");
const input = document.querySelector("#date-input");
const message = document.querySelector(".message");

var date = {
    day: 29,
    month: 10,
    year: 2003
}

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

    if (date.month === 2) {
        if (date.day === 28) {
            if (date.year % 4 === 0) {
                if (date.year % 100 === 0) {
                    if (date.year % 400 === 0) {
                        nextDay = 29;
                        nextMonth = 2;
                    } else {
                        nextDay = 1;
                        nextMonth = 3;
                    }
                } else {
                    nextDay = 29;
                    nextMonth = 2;
                }
            } else {
                nextDay = 1;
                nextMonth = 3;
            }
        } else {
            date.day = date.day
        }
    }
    var nextDate = {
        day: nextDay,
        month: nextMonth,
        year: nextYear
    }
    return nextDate;
};


function findNextPalindrome(date) {
    var nextDate = findNextDate(date);
    var counter = 0;
    while (1) {
        counter = counter + 1;
        var palindromeOrNot = checkPalindromeForDates(nextDate);
        for (let i = 0; i < palindromeOrNot.length; i++) {
            if (palindromeOrNot[i] === true) {
                return [counter, nextDate];
            }
        }
        nextDate = findNextDate(nextDate);
    }
}


button.addEventListener('click', function clickhandler() {
    var userInput = input.value;
    var dateWithoutHyphen = userInput.replaceAll("-", "");
    var date = {
        day: Number(dateWithoutHyphen[6] + dateWithoutHyphen[7]),
        month: Number(dateWithoutHyphen[4] + dateWithoutHyphen[5]),
        year: Number(dateWithoutHyphen[0] + dateWithoutHyphen[1] + dateWithoutHyphen[2] + dateWithoutHyphen[3])
    }
    var palindromeOrNot = checkPalindromeForDates(date);
    for (var i = 0; i < palindromeOrNot.length; i++) {
        if (palindromeOrNot[i] === true) {
            message.innerText = 'is palindrome';
        } else {
            var nextPalindrome = findNextPalindrome(date);
            message.innerText = "isn't palindrome " + nextPalindrome[0] + " " + nextPalindrome[1].day + "-" + nextPalindrome[1].month + "-" + nextPalindrome[1].year;
        }
    }
});
