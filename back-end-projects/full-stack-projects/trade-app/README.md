# trade-app
A full stack app for trading.

## User stories
* I can view all books posted by every user.
* I can add a new book.
* I can update my settings to store my full name, city, and state
* I can propose a trade and wait for the other user to accept the trade.

## Tech Stack
* React 
* Redux 
* React Router 
* Flexbox 
* Nodejs
* Express 
* Mongoose/MongoDB
* Webpack
* now as paas(Using heroku atm)
* Use React-redux-router
* yarn 

## Questions
* Why `path.resolve("..", ".env")` goes one level up then it should in tools/server.js?
* ```
  replace({
    pathname: '/login',
    // what does this line do
    state: { nextPathname: nextState.location.pathname }
  });
  ```
* Can a redux prop be changed using dev tools ?

## Todos
* make images loading better if time permits
* migrate to now if time permits
