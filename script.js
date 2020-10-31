// Get present time from moment.js
var presentTime = moment().format('MMMM Do YYYY');

// Add present day in the header
var dateHeader = $('#currentDay');
dateHeader.addClass("current-date")
dateHeader.text(presentTime);

// Var day to display hour and store info
var day = [
    {
        hour: "09",
        meridiem: "am",
        memo: ""
    },
    {
        hour: "10",
        meridiem: "am",
        memo: ""
    },
    {
        hour: "11",
        meridiem: "am",
        memo: ""
    },
    {
        hour: "12",
        meridiem: "pm",
        memo: "Lunch time"
    },
    {
        hour: "01",
        meridiem: "pm",
        memo: ""
    },
    {
        hour: "02",
        meridiem: "pm",
        memo: ""
    },
    {
        hour: "03",
        meridiem: "pm",
        memo: ""
    },
    {
        hour: "04",
        meridiem: "pm",
        memo: ""
    },
    {
        hour: "05",
        meridiem: "pm",
        memo: ""
    },
    
]


// Get present time from moment.js in 24 format
var getCurrent24Hour = moment().format('H');
console.log(getCurrent24Hour)

generateCalendar ()

//Generating the calendar 
function generateCalendar () {    
    for (var i = 9; i <= 17; i++) {
        // Generate row for each hour: time + text area + save btn
        var hourRow = $("<form>").addClass("form-row")
        $(".container").append(hourRow)

        // Create Div for the hour
        var hourDiv = $("<div>").text(day[i-9].hour + " " + day[i-9].meridiem)
        hourDiv.addClass("col-md-1 hour")

        // Create div for the text area
        var hourMemo = $("<div>").addClass("col-md-10 description p-0")
        // Create text area inside the div
        var infoMemo = $("<textarea>")
        infoMemo.attr("id", "data" + [i])
        hourMemo.append(infoMemo)
        
        // If the current hour is superior to the hour generated, adding class = past
        if (i < getCurrent24Hour) {
            infoMemo.addClass("past")
        } 
        // If the current hour is equal to the hour generated, adding class = present
        else if (i === getCurrent24Hour) {
            infoMemo.addClass("present")
        } 
        // If the current hour is inferior to the hour generated, adding class = future
        else if (i > getCurrent24Hour) {
            infoMemo.addClass("future")
        }

        // Create save button
        var iButton = $("<i class='far fa-save fa-lg'></i>")
        var saveButton = $("<button>").attr("class", "col-md-1 saveBtn")
        saveButton.append(iButton)
        hourRow.append(hourDiv, hourMemo, saveButton)
    }

}

// Add data to the local Storage
function saveData() {
    localStorage.setItem("Day times", JSON.stringify(day));
}

// sets any data in localStorage to the view
function displayMemo() {

    for (var i = 9; i <= 17; i++) {
        $('#data'+[i]).text(day[i-9].memo)
    }
}

displayMemo()