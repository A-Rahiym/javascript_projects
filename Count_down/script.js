const input_container = document.getElementById("input-container");
const countdown_form = document.getElementById("countdownForm");
const dateEl = document.getElementById('date-picker');

// getting DOM elements use to display countdown
const countdown_El = document.getElementById('countdown');
const countdown_ElTitle = document.getElementById('countdown-title');
const countdown_Btn = document.getElementById('countdown-button');
const time_Elements = document.querySelectorAll('span');

//  variables to store count down date and title
let countdown_Title = '';
let countdown_Date = '';
let countdown_value = Date;


const second = 1000;
const minute = second * 60 ;
const hour = minute * 60 ;
const day = hour * 24 ;


// set Data INput Min to Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min',today);

// Populate countdown 
function updateDOM(){
    const now = new Date().getTime();
    const distance = countdown_value - now;
    console.log("distance: ",distance)
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance %  day ) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Hide Input
    input_container.hidden = true;
    // show countdown
    countdown_El.hidden = false;

    // Populate COuntdown
    countdown_ElTitle.textContent = `${countdown_Title}`
    time_Elements[0].textContent = `${days}`;
    time_Elements[1].textContent = `${hours}`;
    time_Elements[2].textContent = `${minutes}`;
    time_Elements[0].textContent = `${seconds}`;
}

//  Take Values from Form input
function update_countdown(e){
    e.preventDefault();
    countdown_Title = e.srcElement[0].value;
    countdown_Date = e.srcElement[1].value;
    // Get number version of current Date , updateDOM
    countdown_value = new Date(countdown_Date).getTime()
    console.log("count-down Value" , countdown_value)
    updateDOM();
} 


//Event Listeners 
countdown_form.addEventListener('submit',update_countdown)

