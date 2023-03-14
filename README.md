# Phase 4 Project: Take A Hike
Welcome to take a hike! This is the code for my Flatiron School Phase 4 project. Take A Hike is a single page web app where users can check out hiking trails and track the hikes they've gone on.

## Installation
If you would like to run the app locally, feel free to fork and clone this repo, then navigate to the directory in your terminal and run:
```
bundle install
rails db:migrate db:seed
npm install --prefix client
```
to install any gems and npm packages as well as create the database, migrate the tables and create some seed data.

## Usage
to run the app in the browser, open a new window in your terminal and enter:
```
rails s
```
to start the backend rails server, then open another window and enter:
```
npm start --prefix client
```
to run the react frontend in your default browser.
You can now make requests to the server either through the frontend using the browser, or using an app like [Postman](https://www.postman.com/).

## Contributing
Feel free to play around with stuff in your own forked version if you like, though this is a school project so I probably won't be able to accept contributions to the main branch, sorry!

## Credits
The frontend for the app is built using [React](https://reactjs.org/) with a [Rails](https://rubyonrails.org/) backend. I used [this template](https://github.com/learn-co-curriculum/project-template-react-rails-api) to build my project, as well as [Render](https://render.com/) to deploy it. The photos used in the seed data are hosted through [Postimages](https://postimages.org/)

This project was done for phase 4 of the Flatiron School's Software Engineering flex program. Thank you so much to everyone at Flatiron for helping me grow through this program so far! 