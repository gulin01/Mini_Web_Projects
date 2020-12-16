'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Foursquare API Info
var clientId = 'RUSZMYTGXIHZAVZKZBHTPIIJVZFZWHMMENVLMH1UXI1RZIHX';
var clientSecret = 'LOEMNFX2VUC424GUP055HBIMNTQDLFOYFNN0IJQTBR2AEHHU';
var url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
var openWeatherKey = '602aee202a72c83d5ddd29037b510ae5';
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
var $input = $('#city');
var $submit = $('#button');
var $destination = $('#destination');
var $container = $('.container');
var $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
var $weatherDiv = $("#weather1");
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
var getVenues = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var city, urlToFetch, response, venues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            city = $input.val();
            urlToFetch = '' + url + city + '&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200405';
            _context.prev = 2;
            _context.next = 5;
            return fetch(urlToFetch);

          case 5:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context.sent;
            venues = jsonResponse.response.groups[0].items.map(function (item) {
              return item.venue;
            });

            console.log(venues);
            return _context.abrupt('return', venues);

          case 13:
            ;
            throw new Error('failed to connect');

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 17]]);
  }));

  return function getVenues() {
    return _ref.apply(this, arguments);
  };
}();

var getForecast = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var urlToFetch, response, _jsonResponse;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            urlToFetch = weatherUrl + '?&q=' + $input.val() + '&APPID=' + openWeatherKey;
            _context2.prev = 1;
            _context2.next = 4;
            return fetch(urlToFetch);

          case 4:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return response.json();

          case 8:
            _jsonResponse = _context2.sent;
            return _context2.abrupt('return', _jsonResponse);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](1);

            console.log(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 12]]);
  }));

  return function getForecast() {
    return _ref2.apply(this, arguments);
  };
}();

// Render functions
var renderVenues = function renderVenues(venues) {
  console.log(venues);
  $venueDivs.forEach(function ($venue, index) {
    var venue = venues[index];
    var venueIcon = venue.categories[0].icon;
    var venueImgSrc = '' + venueIcon.prefix + venueIcon.suffix;
    var venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + '</h2>');
};

var renderForecast = function renderForecast(day) {
  // Add your code here:
  var weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

var executeSearch = function executeSearch() {
  $venueDivs.forEach(function (venue) {
    return venue.empty();
  });
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(function (venues) {
    return renderVenues(venues);
  });
  getForecast().then(function (forecast) {
    return renderForecast(forecast);
  });
  return false;
};

$submit.click(executeSearch);