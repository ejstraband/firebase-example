/**
 * Mocha unit tests for FilmzClient.js
 */

var assert = require('assert');
var config = require('./config.json');
var FilmzClient = require('./FilmzClient');

// Initialize client
var filmz = new FilmzClient(config);

describe('FilmzClient', function () {
  var testMovie = { movie: 'Test Movie' };

  before(function (done) {
    // Add test movie to database
    filmz.movies.push(testMovie)
      .then(function () {
        done();
      });
  })

  after(function () {
    // For some reason, we need to explicitly end the proccess. Otherwise after
    // the tests Node will just sit there until you force quit.
    process.exit();
  });

  describe('#getMovieByTitle()', function () {
    it('should get "Test Movie"', function (done) {
      filmz.getMovieByTitle(testMovie.movie)
        .then(function (movie) {
          assert.equal(movie.val().movie, testMovie.movie);
          done();
        });
    });

    it('should delete "Test Movie"', function (done) {
      filmz.deleteMovieByTitle(testMovie.movie)
        .then(function () {
          filmz.getMovieByTitle(testMovie.movie)
            .catch(function (err) {
              assert.equal(err.message, 'Test Movie is not in database!');
              done();
            })
        });
    });
  });
});
