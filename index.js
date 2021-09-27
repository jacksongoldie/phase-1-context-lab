/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 //for testing in the console
 function init(){
    const array = [["Gray", "Worm", "Security", 1],["notGray", "Worm", "Security", 1]];
    const newArray = createEmployeeRecords(array);
    createTimeInEvent.call(newArray[0], '2021-09-09 1300');
    createTimeOutEvent.call(newArray[0], '2021-09-09 1500');
    hoursWorkedOnDate.call(newArray[0], '2021-09-09');
    wagesEarnedOnDate.call(newArray[0], '2021-09-09');
    findEmployeeByFirstName(newArray, "Gray")
    calculatePayroll(newArray);
 }

function createEmployeeRecord (array){
    //debugger;
    const [firstName, familyName, title, payRate] = array;
    const newObj = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
    console.log(newObj);
    return newObj;
}

function createEmployeeRecords(arrayOfArrays){
    //debugger;
    const newArray = arrayOfArrays.map(createEmployeeRecord)
    console.log(newArray);
    return newArray;
}

const createTimeInEvent = function(dateStamp){
    //debugger;
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateStamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date){
    //struggled - how can this be better?
    //debugger;
    console.log(this);
    //filter for timein events for date, then for timeout events of date, then use new variables to 
    const timeInEventForThisDate = this.timeInEvents.filter((e) => e.date === date);
    //with using [0] below it's not accounting for more than just the first clock in of the day??
    const clockIn = timeInEventForThisDate[0].hour;
    console.log(clockIn);

    const timeOutEventForThisDate = this.timeOutEvents.filter(e => e.date === date);
    const clockOut = timeOutEventForThisDate[0].hour;
    /* if (this.timeInEvents.timeIn.date === date){
       hoursWorked =  (this.timeOutEvents.timeOut.hour - this.timeInEvents.timeIn.hour)/100;
    } */
    //should I use let hoursWorked = 0 then calculate so it doesn't return undefined?
    const hoursWorked = (clockOut - clockIn)/100;
    return hoursWorked;
}

const wagesEarnedOnDate = function (date){
    //debugger;
    const payOwed = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return payOwed;
}

const allWagesFor = function () {
    debugger;
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (arrayOfRecords, firstName){
    //debugger;
    const employee = arrayOfRecords.filter(e => e.firstName === firstName);
    //What am I not doing??? What should I use instead of [0]
    console.log(employee[0]);
    return employee[0];
}

function calculatePayroll(arrayOfRecords){
    debugger;
    const payArray = [];
    for (let i=0; i < arrayOfRecords.length; i++){
    payArray.push(allWagesFor.apply(arrayOfRecords[i]));
    console.log(payArray)
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const pay = payArray.reduce(reducer);
    //Using allWagesFor for each of the employees, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
    console.log(pay);
   return pay;
}

