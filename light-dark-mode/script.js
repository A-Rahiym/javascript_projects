const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// dark or light image
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image1.src = `img/undraw_conceptual_idea_${color}.svg`;

}

// Dark mode styles
function darkmode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
}

// light mode style
function lightmode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0/ 50%)';
    toggleIcon.children[0].textContent = 'lightMode';
    toggleIcon.children[1].classList.replace('fa-moon', "fa-sun");
    imageMode('light');
}

//  Switch theme dynamically
function switchTheme(event) {
    // console.log(event.target.checked);
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark')
        darkmode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme','light')
        lightmode();
    }
}

// Event listener
toggleSwitch.addEventListener('change', switchTheme); 

// check local storage for theme
const currentTheme = localStorage.getItem('theme');
console.log(currentTheme)

if(currentTheme){
    document.documentElement.setAttribute('data-theme',currentTheme);   
}