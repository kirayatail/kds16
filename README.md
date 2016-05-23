# Knowit Developer Summit 2016

## Install
* Install Node & npm
* Run `npm install`
* Run `npm install -g gulp-cli`

## Get your own file for env-vars (`.env`), Run with Heroku DB/services
* Install Heroku toolbelt
* Set up git remote to Heroku - run `git remote add herkou https://git.heroku.com/kds16.git`
* Run `heroku config:list -s > .env`
* Modify the file to match your computer (change URL to http://localhost:<port>)

## Setup to run with local DB (optional)
* Install MongoDB and run the daemon
    * Mac/Linux: `mongod`
    * Win: `C:\mongodb\bin\mongod.exe`
* Remove the MONGODB_URI item in .env

## Run the app
* Run `gulp`
* Start another terminal and run `npm start`
