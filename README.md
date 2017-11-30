# Game Jam Quick-Start Kit

This is a minimal quick-start boilerplate for game jams and prototyping.

Functionality includes:
 - Simple Asset preloader (Images and Sounds)
 - Included bitmap font and basic function to draw text with it
 - Several utility functions for drawing
 - Automatic canvas sizing/positioning
 - Simple Update/Render gameloop with timing
 - Basic Audio system for music and sounds
 - Basic Keyboard Input handler
 - Enough comments to get acquainted with the project

## Setup
Clone the git repository and run either `yarn install` or `npm install` in the project base directory to download dependencies.

## Running the test environment
To run your game in the browser, run `npm start` in the root project directory.

## Building the final game
Run `gulp build` in the root directory to output a zip containing an index.html, bundle.js and the assets you included in your game.

## Notes
This boilerplate currently relies on Gulp 4, and the dependency is pulled from Github. This may break in the future, so beware.

