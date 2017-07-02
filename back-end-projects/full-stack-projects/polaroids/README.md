# Polaroids
A full stack JavaScript app inspired from Pinterest and unsplash.

## User Stories 

* As an unauthenticated user, I can login with Twitter.
* As an authenticated user, I can link to images.
* As an authenticated user, I can delete images that I've linked to.
* As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
* As an unauthenticated user, I can browse other users' walls of images.
* As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

## Tech Stack
* React
* Redux
* Sass
* React Router
* Node
* Express
* Mongoose/MongoDB
* Webpack
* Mocha-Chai
* Travis CI

## To Do
* Mocha/chai tests
* Travis Ci
* React router 4 in different branch

## Questions
* Why array.map mutate states?
* Why `/profile/id` sent back raw json data instead of being handled by react router? This strange behaviour gone away when `/profile/id` was changed  to '/user/id' so that it doesn't conflict with `/profile` path.
* Why mongoose gives promise warning even when bluebird is as promise lib for mongoose?
