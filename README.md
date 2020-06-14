# ChallengeFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6 and it is the back-end part of United Remote web challenge.

The project basically calculate the user Location after his permission then display the nearby shops sorted by distance and the user can like or dislike those shops.

The project uses the [FourSquare api](https://developer.foursquare.com/) to get the nearby shops and communicate with the [back-end part](https://github.com/ELMORABITYounes/ChallengeBackEnd) through ``http://localhost:8080/`` to handle the user authentication with JWT and for saving or removing liked/disliked shops and also for user registration.

## Project structure

the `src/app/services` contains injectable services for authentication and for communicating with rest endpoints. 
the `src/app/utils` contains some helper classes and functions.
the `src/app/models` contains model classes.
the other folders `src/app/shops`,`src/app/liked-shops`,`src/app/register` and `src/app/login`are components.

## FourSquare Api

the [FourSquare api](https://developer.foursquare.com/) exposes some rest endpoints for searching nearby venues and for getting details about those venues and it does not require a billing account like google places api but it is less flexible.

in this project I am using a sandbox account witch has this limitations:
* 950 Regular Calls / Day
* 50 Premium Calls / Day
* 1 Photo per Venue

witch explains why you won't get photos for the shops most of the time.

the api gives you a client id and a secret id to identify your app.

## ScreenShots

User registration

![Imgur](https://i.imgur.com/DVMoh7V.png)

User login

![Imgur](https://i.imgur.com/TFMKfhU.png)

Display of nearby shops sorted by distance

![Imgur](https://i.imgur.com/JcI2OsD.png)

Liking shops

![Imgur](https://i.imgur.com/ethk4pz.png)
![Imgur](https://i.imgur.com/WdgiZ7H.png)

Dislikng shops

![Imgur](https://i.imgur.com/nVBWt3c.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
