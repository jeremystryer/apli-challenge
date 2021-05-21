document.addEventListener("DOMContentLoaded", () => {
  let pageUrl = "https://rickandmortyapi.com/api/character";
  let pages;

  let templates = processTemplates();

  fetch(pageUrl, createCharacterContainer)
    .then(response => response.json())
    .then(data => {
      // pages = data.info.pages; // gives total number of pages
      // pageUrl = data.info.next; // url of next available page
      // i can submit another get request for the next url and keep repeating until the page number of that url is equal to the total number of pages
      console.log(data);

      data.results.forEach(character => {
        let characterContainer = createCharacterContainer();
        insertData(character, characterContainer);
        // console.log(character.image);
        // console.log(character.name);
        // console.log(character.status);
        // console.log(character.species);
        // console.log(character.gender);
        // console.log(character.location.name);
      });

    });

    function createCharacterContainer() {
      let charactersListContainer = document.querySelector("#characters-list-container");
      let characterContainer = document.createElement("div");

      characterContainer.classList.add("character-container");
      charactersListContainer.insertAdjacentElement("beforeend", characterContainer);
      return characterContainer;
    }

    function insertData(char, charContainer) {
        // let charData = char;
        // debugger;

        // charData.forEach(data => {
          // console.log(data);
          // charContainer.insert

        let specificCharacter = templates["character-template"](char);
        charContainer.insertAdjacentHTML("beforeend", specificCharacter);
        // });
        // console.log(character.status);
        // console.log(character.species);
        // console.log(character.gender);
        // console.log(character.location.name);
    }

    function processTemplates() {
      let templates = {};
  
      document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
       templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
      });

      return templates;
    }
  }); 