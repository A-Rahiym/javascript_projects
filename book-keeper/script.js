const modal = document.getElementById('modal');
const modal_show = document.getElementById('show-modal');
const modal_close = document.getElementById('close-modal');
const bookmark_form = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

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
}
// Event Listeners
bookmark_form.addEventListener('submit', storeBookmark)
