const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let Ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true

// Unsplash API
let count = 0;


// unsplash API key
const apiKey = 'sKyv7NlpW5nvglSZ-ANhT4rSJDiM4FgFGS_-MfXWAx4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// checking initial count 
function initialCount(){
    if(initialLoad){
        count = 5;
        initialLoad = false;
    }else{
        count = 30;
    }
}

// check if all images were loaded
function imageLoaded() {

    imagesLoaded++;
    console.log("images loaded", imagesLoaded);
    if(imagesLoaded === totalImages){
        Ready = true;
        initialCount();
        count = 30;
        console.log("ready =", Ready);
     }
}


// Helper Function to set Attributes on DOM Elments
function setAttributes(element, attributes)  {
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
};

// Create ELements for links & photos, add to DOM
function displayPhotos(){

imagesLoaded = 0;
totalImages = photosArray.length;
console.log('total images', totalImages);
photosArray.forEach((photo => {

    //create <a> to link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank',
    });

    // create image per photo
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_discription);
    // img.setAttribute('title',photo.alt_discription);
    setAttributes(img,{
        src:photo.urls.regular,
        alt:photo.alt_discription,
        title:photo.alt_description
    })
    //Put <img> inside <a>, then put both inside imagecontainer element
    item.appendChild(img)
    imageContainer.append(item);

    // Event Listener, check when each is finished loading
    img.addEventListener('load',imageLoaded);
}));
}


// function to get get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch(error){
  }
}
// check to see if scrolling near bottom of page, load More photos
getPhotos();
window.addEventListener('scroll',() => {
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && Ready){
        Ready = false;
        getPhotos();
        console.log("load more")} 
})
