This assignment is for [Apli's](https://www.apli.jobs/) take-home challenge.

The website uses [The Rick and Morty API](https://rickandmortyapi.com/) to retrieve the names, images, and basic information about all characters that have ever appeared in at least one episode of the show. At the time of writing, there are 671 characters. Since the API uses pagination, my `fetch` call is made within a recursive function so that a distinct `fetch` call continues to be made until all available pages have been requested.

For the layout, I made use of `flexbox` and a single media query with a breakpoint at 700px that changes the `flex-direction` to column. I use `handlebars.js` to create the template for the details from each character.

Normally, I would separate the JS functionality into different objects or "classes", but since the scope of this project was small, I didn't do so.