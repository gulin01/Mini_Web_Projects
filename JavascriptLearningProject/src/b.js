// Foursquare API Info
const clientId = 'RUSZMYTGXIHZAVZKZBHTPIIJVZFZWHMMENVLMH1UXI1RZIHX';
const clientSecret = 'LOEMNFX2VUC424GUP055HBIMNTQDLFOYFNN0IJQTBR2AEHHU';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '602aee202a72c83d5ddd29037b510ae5';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200405`;
  
   try{
  const response = await fetch(urlToFetch);
    if(response.ok){
    jsonResponse = await response.json();
    let venues = jsonResponse.response.groups[0].items.map(item=> item.venue);
      console.log(venues);
      return venues;
    };
     throw new Error('failed to connect');
  }
  catch(error){
    console.log(error);
   }
  
}

const getForecast = async() => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
      try{  
        const response = await fetch(urlToFetch);
        if(response.ok){
         const jsonResponse = await response.json();
          return jsonResponse;
        }
      }
  catch(error){
    console.log(error)
  }
}


// Render functions
const renderVenues = (venues) => {
  console.log(venues);
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues=>renderVenues(venues));
  getForecast().then(forecast=>renderForecast(forecast))
  return false;
}

$submit.click(executeSearch)