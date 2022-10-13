const modal = document.getElementById('modal');
const modalShowEl = document.getElementById('book-modal');
const closeModal = document.getElementById('close-modal');
const bookForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('name');
const websiteUrlEl = document.getElementById('url');
const bookmarkContainer = document.getElementById('bookmark-container');


let bookmarks = [];

//show modal,focus on input
function getShowModal(){
    modal.classList.add('show-modal');
    
    websiteNameEl.focus();
    
}
//build bookmark
function buildBookmarks(){

    //remove bookmarks
    bookmarkContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
       //items
      const item =document.createElement('div');
      item.classList.add('item');
      
      // close icon
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('fas','fa-times');
      closeIcon.setAttribute('title','Delete Bookmark');
      closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
      //favicon /link
      const linkInfo = document.createElement('div');
      linkInfo.classList.add('name');

      //favicon
      const favicon = document.createElement('img');
      favicon.setAttribute('src',`img/favicon.png`);
      favicon.setAttribute('alt','favicon');

      //links
      const link =document.createElement('a');
      link.setAttribute('href',`${url}`);
      link.setAttribute('target','_blank');
      link.textContent = name;
      //append to bookmark container
      linkInfo.append(favicon,link);
      item.append(closeIcon,linkInfo);
      bookmarkContainer.appendChild(item);
     
      
    });
}
// fetch bookmark
function fetchBookmarks(){
   // get from localStorage
   if(localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   }else{
    // create bookmarks array in localStorage
    bookmarks = [
        {
            name: 'Mac ndeche',
            url:'https://facebook.com',
        },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }
buildBookmarks();
}
//delete bookmark
function deleteBookmark(url){
   bookmarks.forEach((bookmark, i) =>{
    if (bookmark.url === url){
        bookmarks.splice(i, 1);
    }
   });
   //update boookmark array
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   fetchBookmarks();

}

//handle data from form
 function storeBookForm(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    
    let urlValue = websiteUrlEl.value;
    
    if(!urlValue.includes('http://', 'https://')){
    urlValue = `https://${urlValue}`;
    }
   if(!validate(nameValue, urlValue)){
    return false;
   }
   const bookmark = {
    name: nameValue,
    url: urlValue,
   };
   bookmarks.push(bookmark);
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   
   fetchBookmarks();
   
   bookForm.reset();
   websiteNameEl.focus();
 }


//e listener
modalShowEl.addEventListener('click', getShowModal);
closeModal.addEventListener('click',() =>modal.classList.remove('show-modal'));
window.addEventListener('click', (e) =>(e.target === modal ? modal.classList.remove('show-modal') : false));


// validate form
function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  
    const regex = new RegExp(expression);
        if(!nameValue || !urlValue){
            alert('Please provide a valid value for both field');
            return false;
        }
    
    if(!urlValue.match(regex)){
        alert('Please provide a valide url');
        return false;
    }
    //valid
    return true;
}


//submit

bookForm.addEventListener('submit', storeBookForm);


//on load,
fetchBookmarks();