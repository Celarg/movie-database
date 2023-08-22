# Movie Database

This is a simple movie database application built with React, TypeScript, and Vite. Page consist of 3 main parts: 
- `movie search`
- `movie detail`
- `favorite movies`

I have divided all logic & configs into folder `lib` and source code into folder `src` to make it easier to maintain and scale. Codebase is split by features, 
so each feature has its own folder with all necessary files.

### 1. Movie search

In this section user can search for movies by title, there is basic pagination on bottom of the page, I have added some skeleton loading to make it more user friendly.
When user clicks on movie card, he will be redirected to `MOVIE DETAIL` page, which is subpage of `MOVIE SEARCH`. Movie cards are displaying all possible info I could extract from API.

### 2.MOVIE DETAIL

On this page user can see more detailed info about movie, there is also possibility to add movie to favorites. 
When user is adding movie to favorites, it will be saved to local storage, so when user will refresh page, he will still see all movies that he has added to favorites.

### 3. FAVORITE MOVIES

This page is displaying all movies that user has added to favorites. There is also possibility to remove movie from favorites. By clicking on movie card, user will be also redirected to `MOVIE DETAIL` page.

## Future improvements
I would like to add some more features to this app, like: 
- properly handle incorrect data from API,
- when user visits first time page, he can see some popular/new movies,

## All requirements are met
- OMDb API, Typescript, Material UI, React-Router, Context Api, react-query, Local Storage, SCSS,
-  each page only need to download its own data, there are no useless calls to API
- responsive design
