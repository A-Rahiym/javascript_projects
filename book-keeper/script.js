const modal = document.getElementById('modal');
const modal_show = document.getElementById('show-modal');
const modal_close = document.getElementById('close-modal');
const bookmark_form = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
let bookmarks = [];

// Show Modal, focus on Input 
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listeners 
modal_show.addEventListener('click', showModal);
modal_close.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate form
function validate(nameValue, urlValue) {
    // expression to be used for validation
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if(!nameValue || !urlValue){
        alert('Dont leave the fields empty')
        return false
    }

    // apply regular expression
    if (urlValue.match(regex))
        alert('match');
    if (!urlValue.match(regex)) {
        alert('please provide a valid web address');
        return false;
    }
    return true
}

// Building bookmarks DOM
function buildbookmarks(){
    // Remove all bookmark elements 
    bookmarksContainer.textContent= '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const {name, url} =bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // close icon 
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link container
        const LinkInfo = document.createElement('div');
        LinkInfo.classList.add('name');
        // favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src' ,`https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href',url);
        link.setAttribute('target','_blank');
        link.textContent = name;

        // Append to bookmarks container
        LinkInfo.append(favicon,link);
        item.append(closeIcon,LinkInfo);
        bookmarksContainer.append(item);
        console.log(closeIcon)
    }) 
}
// Delete Bookmark 
function deleteBookmark(url){
    bookmarks.forEach((bookmark,i) => {
        if (bookmark.url === url){
            bookmarks.splice(i,1)
        } 
    });
    // Update bookmarks array in localstorage, re-populate DOM
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookmarks();
}
// Fetch Bookmarks 
function fetchBookmarks(){
    // get bookmarks form localstorage 
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // Create bookmarks array in localstorage 
        const bookmarks = [{
        name: "test",
        url: "test.com"
        }]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }; 
    buildbookmarks();
}

// Handle Data from form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if (!urlValue.includes("http://", 'https://')) {
        urlValue = `http://${websiteUrlEl.value}`;
    }
    if(!validate(nameValue,urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    // saving bookmarks to localstorage
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    bookmark_form.reset();
    websiteNameEl.focus();
}
// Event Listeners
bookmark_form.addEventListener('submit', storeBookmark)

// On load, Fetch Bookmark
fetchBookmarks();