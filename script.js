document.addEventListener("DOMContentLoaded", () => {
  let pageUrl = "https://rickandmortyapi.com/api/character";
  let pages;

  fetch(pageUrl)
    .then(response => response.json())
    .then(data => {
      pages = data.info.pages; // gives total number of pages
      pageUrl = data.info.next; // url of next available page
      // i can submit another get request for the next url and keep repeating until the page number of that url is equal to the total number of pages
    });
  }); 