document.addEventListener("DOMContentLoaded", () => {
  let pageUrl = "https://rickandmortyapi.com/api/character";
  let pageCounter = 2;
  let pages;

  let templates = processTemplates();

  // recursive function to call all availables pages from API
  function paginatedFetch(pageUrl, createCharacterContainer) {
    fetch(pageUrl)
    .then(response => response.json())
    .then(data => {
      pages = data.info.pages; // total number of available pages
      pageUrl = data.info.next; // url of next available page

      data.results.forEach(character => {
        let characterContainer = createCharacterContainer();
        insertData(character, characterContainer);
      });

      if (pageCounter > pages) {
        return;
      } else {
        pageCounter += 1;
        paginatedFetch(pageUrl, createCharacterContainer);
      }
    });
  }

  function createCharacterContainer() {
    let charactersListContainer = document.querySelector("#characters-list-container");
    let characterContainer = document.createElement("div");

    characterContainer.classList.add("character-container");
    charactersListContainer.insertAdjacentElement("beforeend", characterContainer);
    return characterContainer;
  }

  function insertData(char, charContainer) {
    let specificCharacter = templates["character-template"](char);
    charContainer.insertAdjacentHTML("beforeend", specificCharacter);
  }

  function processTemplates() {
    let templates = {};

    document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
      templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
    });

    return templates;
  }

  function bindViewCharacterButtonEvent() {
    const viewCharacterButtons = document.getElementsByClassName("view-character-button");

    document.addEventListener("click", event => {
      if ([...viewCharacterButtons].includes(event.target)) {
        let selectedCharacterId = getIdOfSelectedCharacter(event.target);
        getInfo(selectedCharacterId);
      }
    });
  }

  function getIdOfSelectedCharacter(target) {
    return target.parentElement.dataset.attribute;
  }

  function getInfo(characterId) {
    let characterUrl = "https://rickandmortyapi.com/api/character/" + characterId;

    fetch(characterUrl, replaceFeaturedInfo)
    .then(response => response.json())
    .then(data => {
      replaceFeaturedInfo(data);
    });
  }

  function replaceFeaturedInfo(info) {
    let featuredImage = document.querySelector("#featured-image");
    let featuredDescription = document.querySelector("#featured-description");
    let showNumbers = [];
    let stringOfEpisodes = "";

    info.episode.forEach(url => {
      let showNumber = url.match(/[0-9]+$/)[0];
      showNumbers.push(showNumber);
    });

    showNumbers.forEach(number => {
      stringOfEpisodes += number + ", ";
    });

    // remove comma and space after last number in episodes
    stringOfEpisodes = stringOfEpisodes.substring(0, stringOfEpisodes.length - 2); 

    featuredImage.src = info.image;
    featuredImage.alt = `Profile photo of ${info.name}`;

    featuredDescription.children[0].innerText = info.name;
    featuredDescription.children[1].innerText = `${info.name} has appeared in the following episodes: ${stringOfEpisodes}`;
  }

  paginatedFetch(pageUrl, createCharacterContainer);
  bindViewCharacterButtonEvent();
}); 