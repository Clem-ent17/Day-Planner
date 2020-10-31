// Get present time from moment.js
var presentTime = moment().format('MMMM Do YYYY')

// Add present day in the header
var dateHeader = $('#currentDay')
dateHeader.addClass("current-date")
dateHeader.text(presentTime)

// Var day to display hour and store info
var day = [
    {
        id: "0",
        hour: "09",
        meridiem: "am",
        memo: ""
    },
    {
        id: "1",
        hour: "10",
        meridiem: "am",
        memo: ""
    },
    {
        id: "2",
        hour: "11",
        meridiem: "am",
        memo: ""
    },
    {
        id: "3",
        hour: "12",
        meridiem: "pm",
        memo: "Lunch time"
    },
    {
        id: "4",
        hour: "01",
        meridiem: "pm",
        memo: ""
    },
    {
        id: "5",
        hour: "02",
        meridiem: "pm",
        memo: ""
    },
    {
        id: "6",
        hour: "03",
        meridiem: "pm",
        memo: ""
    },
    {
        id: "7",
        hour: "04",
        meridiem: "pm",
        memo: ""
    },
    {
        id: "8",
        hour: "05",
        meridiem: "pm",
        memo: ""
    },
    
]


// Get present time from moment.js in 24 format
var getCurrent24Hour = moment().format('H')
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
        infoMemo.attr("id", day[i-9].id)
        hourMemo.append(infoMemo)
        
        // If the current hour is superior to the hour generated, adding class = past
        if (i < getCurrent24Hour) {
            infoMemo.addClass("past info-memo")
        } 
        // If the current hour is equal to the hour generated, adding class = present
        else if (i === getCurrent24Hour) {
            infoMemo.addClass("present info-memo")
        } 
        // If the current hour is inferior to the hour generated, adding class = future
        else if (i > getCurrent24Hour) {
            infoMemo.addClass("future info-memo")
        }

        // Create save button
        var iButton = $("<i class='far fa-save fa-lg'></i>")
        var saveButton = $("<button>").attr("class", "col-md-1 saveBtn")
        saveButton.append(iButton)
        hourRow.append(hourDiv, hourMemo, saveButton)
    }

}


// Add var day data to the local Storage
function saveData() {
    localStorage.setItem("day", JSON.stringify(day))
}


// Display the localStorage data memo into the text area
function displayMemo() {
    for (var i = 9; i <= 17; i++) {
        $('#'+[i-9]).text(day[i-9].memo)
    }
}


// Display existing localStorage data memo into the text area if exist
function printMemo() {
    var storedDay = JSON.parse(localStorage.getItem("day"))

    if (storedDay) {
        day = storedDay
    }

    // Call functions
    saveData()
    displayMemo()
}


// loads any existing localstorage data after components created
printMemo();


// Button to save info in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault()

    // Save in variable the id number in the text area
    var saveIndex = $(this).siblings(".description").children(".info-memo").attr("id");
    console.log(saveIndex);
    // Push the new info into the var day.memo
    day[saveIndex].memo = $(this).siblings(".description").children(".info-memo").val();
    
    saveData()
    displayMemo()
})