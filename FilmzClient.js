var firebase = require('firebase');

/**
 * Filmz n' Feast API
 *
 * @constructor
 * @param {Object} config - Firebase configuration.
 */
function FilmzClient (config) {
  this.app = firebase.initializeApp(config);
  this.database = this.app.database();
  this.movies = this.database.ref('/movies');
}

/**
 * Get a movie by the title.
 *
 * @param {string} title
 * @return {firebase.Promise<firebase.database.DataSnapshot>} - Firebase
 *   promise that resolves to a snapshot of the given movie.
 */
FilmzClient.prototype.getMovieByTitle = function (title) {
  // Create a new `movies` reference that contains only the movies that match
  // the title.
  var filteredMoviesRef = this.movies.orderByChild('movie').equalTo(title)

  // Grab a snapshot of the filteredMoviesRef data by using .once(). The .once()
  // method listens exactly once for the given event type and returns a promise.
  // Therefore, running .once() with the 'value' on a reference that contains
  // one entry is is Firebase's extroardinarily convoluted way of accessing
  // a single database entry.
  var firebasePromise = filteredMoviesRef.once('value')
    .then(function (filteredMoviesSnapshot) {
      // .exists() checks if there is any data in the snapshot, which let's us
      // know if the title search returned anything.
      if (!filteredMoviesSnapshot.exists()) {
        // If the snapshot is empty, throw an error indicating what happened.
        throw new Error(title + ' is not in database!');
      } else {
        // Even though this snapshot contains only one entry, that entry has a
        // key which we cannot possibly know, so the only we can access the info
        // in that entry is to loop through the snapshot and then save the entry
        // to an external variable.
        var movie;

        filteredMoviesSnapshot.forEach(function (movieSnapshot) {
          movie = movieSnapshot;
        })

        // Resolve the promise.
        return movie;
      }
    });

  // Return the promise.
  return firebasePromise;
}

/**
 * Delete the movie with the given title.
 *
 * @param {string} title
 * @return {firebase.Promise} - Resolves after the movie is deleted.
 */
FilmzClient.prototype.deleteMovieByTitle = function (title) {
  return this.getMovieByTitle(title)
    .then(function (movieSnapshot) {
      return movieSnapshot.ref.remove();
    });
}

module.exports = FilmzClient;
