// DOM elements to input countdown
const input_container = document.getElementById("input-container");
const countdown_form = document.getElementById("countdownForm");
const dateEl = document.getElementById('date-picker');


// getting DOM elements use to display countdown
const countdown_El = document.getElementById('countdown');
const countdown_ElTitle = document.getElementById('countdown-title');
const countdown_Btn = document.getElementById('countdown-button');
const time_Elements = document.querySelectorAll('span');

// DOM elements to display countdown 
const complete_El = document.getElementById('complete');
const completeEl_info = document.getElementById('complete-info');
const complete_Btn = document.getElementById('complete-button'); 

//  variables to store count down date and title
let countdown_Title = '';
let countdown_Date = '';
let countdown_value = Date;
let countdown_Active;
let savedcount_down;


// constants for date conversioon from miliseconds
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// set Data Input Min to Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', today);

// Populate countdown 
function updateDOM() {
    // Run the functions for the following interval
    countdown_Active = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdown_value - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        input_container.hidden = true;


        if (distance < 0) {
            // if countdown has ended , show complete 
            countdown_El.hidden = true;
            clearInterval(countdown_Active);
            completeEl_info.textContent = `${countdown_Title} finished on ${countdown_Date}`;
            complete_El.hidden = false;
        } else {
            // show countdown in progress
            countdown_El.hidden = false;
            // Populate Countdown
            countdown_ElTitle.textContent = `${countdown_Title}`
            time_Elements[0].textContent = `${days}`;
            time_Elements[1].textContent = `${hours}`;
            time_Elements[2].textContent = `${minutes}`;
            time_Elements[3].textContent = `${seconds}`;
        }
    }, second);
}

//  Take Values from Form input
function update_countdown(e) {
    e.preventDefault();
    countdown_Title = e.srcElement[0].value;
    countdown_Date = e.srcElement[1].value;
    savedcount_down ={
        title: countdown_Title,
        date: countdown_Date
    };
    localStorage.setItem('countdown', JSON.stringify(savedcount_down));

    // Get number version of current Date , updateDOM
    if ((countdown_Date === '') & countdown_Title === "") {
        alert('Please Enter a Date / enter a title');
    } else {
        countdown_value = new Date(countdown_Date).getTime()
        updateDOM();
    }
}

// Reset All values
function reset() {
    countdown_El.hidden = true;
    complete_El.hidden = true;
    input_container.hidden = false;
    // stop the countdown

    clearInterval(countdown_Active);
    countdown_Title = "";
    countdown_Date = "";
    localStorage.removeItem('countdown');
}

// Restore previous countdown 
function restorePrev_countdown(){
    if(localStorage.getItem('countdown')){
        input_container.hidden = true;
        savedcount_down = JSON.parse(localStorage.getItem('countdown') )
        countdown_Title = savedcount_down.title;
        countdown_Date = savedcount_down.date;
        countdown_value = new Date(countdown_Date).getTime()
        updateDOM();
    }
}
//Event Listeners 
countdown_form.addEventListener('submit', update_countdown);
countdown_Btn.addEventListener("click", reset);
complete_Btn.addEventListener("click", reset);

// On load, check local storage
restorePrev_countdown();