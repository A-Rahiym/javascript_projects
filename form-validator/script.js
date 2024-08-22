const form = document.getElementById('form');
const password1_El = document.getElementById('password1');
const password2_El = document.getElementById('password2');
const message_container = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm(){
    // using constraint API
    isValid = form.checkValidity()

    // Style main message for an error
    if(!isValid){        
        message.textContent = "Please fill out all fields."
        message.style.color = "red"
        message_container.style.borderColor = "red"}

    // Check to see if passwords match
    if(password1_El.value === password2_El.value){
        passwordsMatch = true;
        password1_El.style.borderColor="green";
        password2_El.style.borderColor="green";
    }
    else{
        passwordsMatch = false;
        message.textContent = "Make sure password match."
        message.style.color = "red"
        message_container.style.borderColor = "red";
        password1_El.style.borderColor = "red";
        password2_El.style.borderColor = "red";
        
        }
    
    // if form is valid and password match
    if(isValid && passwordsMatch){
        message.textContent = 'Successfully Registered!'
        message.style.color = "green";
        message_container.borderColor = "green";
    }
}

function storeFormData(){
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        phone: form.email.value,
        email: form.website.value,
        password: form.password.value
    };
    console.log(user);
}

    function processFormData(e){
        e.preventDefault();
        // Validate 
        validateForm();
        // submit Data if Valid 
        if(isValid && passwordsMatch){
            storeFormData();
        }
}
// Event Listener 
form.addEventListener('submit',processFormData)
