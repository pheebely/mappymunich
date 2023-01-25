const home = [11.580089, 48.139152] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/pheebely/cld82me56000d01t7749mkago',
center: home,
zoom: 15,
minZoom: 9,
maxZoom: 18,
pitch: 35, // pitch in degrees
projection: 'globe'
});

/* Given a query in the form "lng, lat" or "lat, lng"
* returns the matching geographic coordinate(s)
* as search results in carmen geojson format,
* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
const coordinatesGeocoder = function (query) {
  // Match anything which looks like
  // decimal degrees coordinate pair.
  const matches = query.match(
  /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
  );
  if (!matches) {
  return null;
  }
   
  function coordinateFeature(lng, lat) {
  return {
  center: [lng, lat],
  geometry: {
  type: 'Point',
  coordinates: [lng, lat]
  },
  place_name: 'Lat: ' + lat + ' Lng: ' + lng,
  place_type: ['coordinate'],
  properties: {},
  type: 'Feature'
  };
  }
   
  const coord1 = Number(matches[1]);
  const coord2 = Number(matches[2]);
  const geocodes = [];
   
  if (coord1 < -90 || coord1 > 90) {
  // must be lng, lat
  geocodes.push(coordinateFeature(coord1, coord2));
  }
   
  if (coord2 < -90 || coord2 > 90) {
  // must be lat, lng
  geocodes.push(coordinateFeature(coord2, coord1));
  }
   
  if (geocodes.length === 0) {
  // else could be either lng, lat or lat, lng
  geocodes.push(coordinateFeature(coord1, coord2));
  geocodes.push(coordinateFeature(coord2, coord1));
  }
   
  return geocodes;
  };

// Add the geocoder control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
placeholder: 'Search or "Lat, Long"',
mapboxgl: mapboxgl,
collapsed: true,
reverseGeocode: true
})
);

// Add geolocate control to the map.
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
// When active the map will receive updates to the device's location as it changes.
trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
showUserHeading: true
})
);

// Add home button to fly to home
const homePosition = {
    center: home,
    zoom: 15,
    pitch: 40,
    bearing: 0
};

class HomeButton {
    onAdd(map){
      this.map = map;
      this.container = document.createElement('div');
      this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      this.container.innerHTML = `<button class="icon" title="Home"><i class="fa-solid fa-house"></i></button>`;
      this.container.addEventListener("click",() => map.flyTo(homePosition));
      return this.container;
    }
    onRemove(){
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }
  
  const FlytoControl = new HomeButton();
  
  map.addControl(FlytoControl);


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add font awesome symbols for accessibility and must-see
// const wheelchair = "<i class=\"fa-brands fa-accessible-icon\"></i>"
// const elderly = "<i class=\"fa-solid fa-person-cane\"></i>"
// const stroller = "<i class=\"fa-solid fa-baby-carriage\"></i>"
// const elev = "<i class=\"fa-solid fa-elevator\"></i>"
// const fire = "<i class=\"fa-solid fa-fire\"></i>"

// Add attractions layer as constant.
// Tried to use github link but it didn't work.
// const attractions = "https://github.com/pheebely/mappymunich/blob/main/data/Munich-Intro.geojson";
// Tried local source but didn't work.
  // const attractionPoints = "../data/Munich-Intro.geojson";

// var attractions = "https://github.com/pheebely/mappymunich/blob/main/data/Munich-Intro.geojson"

const attractions =
{
  "type": "FeatureCollection",
  "name": "Munich-Intro",
  "features": [
      { "type": "Feature", "properties": { "Latitude": 48.137245, "Longitude": 11.57551, "Name": "Marienplatz", "Number": 1, "Type": "Plaza", "Address": "Marienplatz, 80331 München", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Marienplatz is a square in the heart of Munich that has been the main square of the city since 1158. As such, it was the main venue where public events, tournaments and executions traditionally took place.<br><br>Ideal location for the very first encounter with Munich. Historic, architecturally attractive and vibrant, filled with people (locals and tourists alike) throughout the day, it never lacks excitement. Also, just like the rest of Munich, it's spotlessly clean. From November to December, the Christmas Market is one of a kind and truly magical.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-07/marienplatz-750.jpg?h=5d310a80' alt='Marienplatz plaza in Munich Germany with Tourists'", "imgsource": "Shutterstock", "Website": "https://www.muenchen.de/en/sights/marienplatz-munichs-old-town", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "S1-S8 (coming from central station exit left to the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "This disabled or wheelchair-accessible toilet for everyone is located on the mezzanine floor at Marienplatz (direction Viktualienmarkt) in the general toilet facility.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3 spaces Sparkassenstraße 2, 4 spaces Dienerstraße, 3 spaces Burgstraße 3" }, "geometry": { "type": "Point", "coordinates": [ 11.57551, 48.137245 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.137348, "Longitude": 11.576202, "Name": "Neues Rathaus", "Number": 2, "Type": "Landmark", "Address": "Marienplatz 8, 80331 München", "Hours": "Oct-Apr, Mo-Fr 10:00-17:00 <br> May-Sep, 10:00-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "With its ornate, Neo-Gothic facade, the Neues Rathaus (New Town Hall) at Marienplatz (square) looks slightly older than it actually is. As a matter of fact, initial construction took place between 1867 and 1905 after the neighbouring Altes Rathaus (Old Town Hall) became too small for Munich’s city council. <br><br> One of the most important attractions is the Glockenspiel in the hall's tower, whose daily performances at 11 a.m. and 12 a.m. (and 5 p.m. in the summer months) attract audiences from around the world.", "image": "src='/images/NeuesRathaus.jpg' alt='Neues Rathause building from the front in Munich Germany'", "imgsource": "Jörg Lutz", "Website": "https://stadt.muenchen.de/infos/neues-rathaus-aussen.html", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "S1-S8 (coming from central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Free access to the tower for people with disabilities and their companion.<br>At ground level over the passage to the formal courtyard, ramp with 21 % gradient and 2 handrails to the 1st lift, after the 2nd lift ramp with 21 % gradient and upwards left handrail. Through the left door to the observation platform, there a ramp with 24 % gradient without handrails. Narrowest part of the platform 75 cm.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3 spaces Sparkassenstraße 2, 4 spaces Dienerstraße, 3 spaces Burgstraße 3", "Phone": "+49 89 233 00", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "elderly": null, "stroller": null, "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/rampe-rathausturm.klein.jpg'" }, "geometry": { "type": "Point", "coordinates": [ 11.576202, 48.137348 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.136503, "Longitude": 11.576054, "Name": "Peterskirche", "Number": 3, "Type": "Religious", "Address": "Rindermarkt 1, 80331 München", "Hours": "Mo-Su 07:30-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "St. Peter's Church is a Roman Catholic parish church in the inner city of Munich, southern Germany. Its 91-metre tower is commonly known as \"Alter Peter\"—Old Peter—and is emblematic of Munich. St Peter's is the oldest recorded parish church in Munich and presumably the originating point for the whole city.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/6/7/4/2/2662476-1-ger-DE/Alter%20Peter%20mit%20Sonnenstern%2C%20©%20München%20Tourismus%2C%20Joerg%20Lutz.jpg'", "imgsource": "Jörg Lutz,  simplyMunich", "Website": "https://alterpeter.de/pfarrkirche-st-peter/", "MVV": "S1-S8 (coming from the central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Stepless. To Viktualienmarkt precipitous!", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "2 spaces Rindermarkt 14, 3 spaces Rindermarkt 5", "Phone": "+49 89 210237 760", "elderly": null, "stroller": null, "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/st._peter.klein.jpg'" }, "geometry": { "type": "Point", "coordinates": [ 11.576054, 48.136503 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.135146, "Longitude": 11.576256, "Name": "Viktualienmarkt", "Number": 4, "Type": "Shopping", "Address": "Viktualienmarkt 3, 80331 München", "Hours": "Mo-Sa 08:00-20:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Viktualienmarkt is Munich’s largest market and a hub for the city’s foodies. Spread across 22,000 square meters, it features a huge range of fresh produce with much more than just fruit and vegetables: Bakers, butchers, fishmongers, delicatessens and flower stalls have turned Viktualienmarkt into a Munich landmark for more than 200 years.\n\nThe best thing: entry to the market is free. It also features food stalls and a comfy beer garden, complete with an authentic Bavarian Maibaum (Maypole).", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/20210422_viktualienmarkt_ansicht_blumen_spargel_anettegoettlicher-03441.jpg?h=0d497e6f'", "imgsource": "Anette Göttlicher", "Website": "https://www.muenchen.de/en/sights/attractions/viktualienmarkt-top-sight-munich", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "Bus 52, 62, 132 Viktualienmarkt, Bus 52, 62 Blumenstraße, S1-S8 (coming from central station, exit left to access the elevator!), U3, U6, 132 Marienplatz", "Access": "Pavement: cobblestone,  tiling.<br> This public toilet is located at Viktualienmarkt, Westenriederstraße at the corner of Frauenstraße.\n\nThere is a ramp in front of the entrance.\n\nRamp: Length: 1.6 m, Slope: 9.4%", "Phone": "+49 89 890682 05", "elderly": null, "stroller": null }, "geometry": { "type": "Point", "coordinates": [ 11.576256, 48.135146 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.137665, "Longitude": 11.579815, "Name": "Hofbräuhaus", "Number": 5, "Type": "Food", "Address": "Platzl 9, 80331 München", "Hours": "Mo-Su 09:00-24:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Hofbräuhaus is probably the best-known “watering hole” in Munich. Dating all the way back to 1589, this beer hall was founded by the Duke of Bavaria, Wilhelm V, and originally, surprisingly enough, was not open to the public. Luckily for today's tourists and locals, though, in 1828 it finally opened up to the masses. Today, this hospitable spot, thick with traditional atmosphere and friendly vibes, is where you can come to enjoy typical Bavarian food to your heart's content, listen to the Oompah band play loudly on stage, and gulp down the rich Hofbräuhaus beer in large, one-liter steins, which the Germans call a Mass.<br><br>Renowned for its beer, Hofbräuhaus also made mark in history on 24 February 1920, when Adolf Hitler held here one of his first propaganda gatherings.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/9/9/5/5/265599-1-ger-DE/film-hofbrauhaus-02-foto-redline-enterprises-sm-3000.jpg'", "imgsource": "simplyMunich", "Website": "https://www.hofbraeuhaus.de/de/willkommen.html", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "By public transport: The tram stop Nationaltheater of line 19 is not far away.\nBy car: better not.", "Access": "Access through the main entrance is problem-free. You have to go through a hinged door first, stop on the right, which strikes inwards (180cm clear width) and then through a very large (400x400cm) porch and another door, just like the first. The guest rooms on the first floor can be continuously reached by kitchen lift (door 130 cm, cabin 130x105cm). There is another lift, but to use it, you have to overcome a 7cm level.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "In Maximilianstraße at the Nationaltheater,  north side, height stage entrance, 300 m away, five wheelchair parking spaces are designated.", "Phone": "+49 89 290136 129", "guideDog": "<i class=\"fa-solid fa-dog\"></i>" }, "geometry": { "type": "Point", "coordinates": [ 11.579815, 48.137665 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.139152, "Longitude": 11.580089, "Name": "Maximilianstrasse", "Number": 6, "Type": "Shopping", "Address": "Maximilianstr. 16, 80539 München", "Hours": "Open 24 Hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Maximilian street (Maximilianstraße) is one of the main streets of Munich and one of the most glamorous and luxurious streets in Germany. Maximilianstraße is one of Munich's four royal avenues, along with Brienner Straße, Ludwigstraße and Prinzregentenstraße. It starts at Max-Joseph-Platz, home to the Residenz and the National Theatre, and runs east-west. You can stroll wonderfully here,  enjoy the flair of the street and marvel at the noble pieces in the artfully decorated shop windows.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Maximilianstraße_München_2006.jpg/640px-Maximilianstraße_München_2006.jpg' alt='Maximilianstrasse during the day.'", "imgsource": "Wikipedia.org", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/maximilianstrasse", "Access": "Wide sidewalks,  pedestrian friendly.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "At the Nationaltheater,  north side, height stage entrance, 300 m away, five wheelchair parking spaces are designated. Street parking also available." }, "geometry": { "type": "Point", "coordinates": [ 11.580089, 48.139152 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.140292, "Longitude": 11.578246, "Name": "Residenz München", "Number": 7, "Type": "Palace", "Address": "Residenzstraße 1, 80333 München", "Hours": "Garden: Open 24 Hours<br>Museum: Mo-Su 10:00-17:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Residenz Royal Palace (or Munich Residenz) is the former seat of the Bavarian Government and the residence of dukes, electors and kings from the Wittelsbach family, rulers of Bavaria, who lived here between 1508 and 1918. Today, the palace houses a museum and boasts some of the finest room decorations in Europe.", "image": "src='https://www.residenz-muenchen.de/bilder/residenz/slider/079a_fassade_m-j-platz500.jpg?timestamp=1673217684277'", "imgsource": "Residenz München", "Website": "https://www.residenz-muenchen.de/englisch/tourist/index.htm", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "S1-S8 (from the main station to get off to the left!), U3, U6, Bus 132 Marienplatz, U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz, Tram 19, N19 Nationaltheater.", "Access": "Users of wheelchairs need assistance! Group guided tours for persons with walking disabilities and sight impaired on special arrangement with the chateau administration. The king's building is accessible from Max-Joseph-Platz, you need assistance of the staff for the elevator.\nCuvillies-Theater: at ground level via Brunnenhof (cobblestone pavement!), bell 85 cm high, elevator to the first balcony.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "5 spaces in Maximilianstraße 8,<br>2 spaces at Max-Joseph-Platz 2", "Phone": "+49 89 29067-1", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "image2": null }, "geometry": { "type": "Point", "coordinates": [ 11.578246, 48.140292 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.141756, "Longitude": 11.577346, "Name": "Feldherrnhalle", "Number": 8, "Type": "Monument", "Address": "Residenzstraße 1, 80333 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Feldherrnhalle is The Feldherrnhalle or Field Marshall’s Hall is a large loggia built to commemorate Bavarian military leaders and soldiers who fell during the Franco-Prussian War. It is located at the southern end of Odeonsplatz, between Theatinerstraße and Residenzstraße. The monumental hall was built between 1841 and 1844 by the famous architect Friedrich von Gärtner, commissioned by King Ludwig I.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/feldherrnhalle-sommerabend.jpg?h=19f14c2c' alt='Feldhernnhalle monument at night'", "imgsource": "Michael Hofmann", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/bauwerke-und-denkmaeler/feldherrnhalle", "Access": "Pedestrian zone", "parking": null, "parking_text": null }, "geometry": { "type": "Point", "coordinates": [ 11.577346, 48.141756 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.141978, "Longitude": 11.577134, "Name": "Theatinerkirche", "Number": 9, "Type": "Religious", "Address": "Salvatorplatz 2A, 80333 München", "Hours": "Mo-Su 07:00-20:00", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Ground level at the right entrance,  electric door opener 85 cm high.  Inside electric door opener 85 cm high to the nave.<br><br>With its yellow facade and ornate interior, the Theatinerkirche (Theatine Church) at Odeonsplatz is one of the most beautiful churches in Munich. To say thank you for the birth of Max Emanuel, the long-awaited heir to the throne, in the mid 17th century, Elector Ferdinand Maria and his wife Henriette Adelaide commissioned architects from Italy to build the “most beautiful and precious church.”", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_medium/4/2/3/9/69324-1-ger-DE/theatinerkirche-innen-sonne-foto-sven-kolb-3000.jpg'", "imgsource": "simplyMunich", "Website": "http://www.theatinerkirche.de/", "MVV": "U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz", "Access": "Ground level at the right entrance, electric door opener 85 cm high. Inside electric door opener 85 cm high to the nave.", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "2 spaces Salvatorplatz 2, underground parking Am Salvatorplatz", "Phone": "+49 89 2106960", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/theatinerkirche-eingang-rechts.klein.jpg'" }, "geometry": { "type": "Point", "coordinates": [ 11.577134, 48.141978 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.14236, "Longitude": 11.581422, "Name": "Hofgarten", "Number": 10, "Type": "Garden", "Address": "Hofgartenstraße 1, 80538 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Hofgarten (Royal Garden) at the Residenz palace is an idyllic green park on the edge of Munich’s historic old town. At the centre of the park, you will find a pavilion, popularly known as Diana Temple. The delicate,  dodecagonal pavilion,  which features eight entrance archways, was created by Heinrich Schön the Elder in 1615.  Right beside it,  you can also visit the Munich Residenz,  the largest inner-city palace in Germany.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/HOFGARTEN%20OBEN%204343.jpg?h=08b866d1'", "imgsource": "Maximilian Linner / Shutterstock.com", "Website": "https://www.residenz-muenchen.de/deutsch/hofgart/index.htm", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz", "Access": "Stepless via Odeonsplatz and Galeriestraße,  steep drive-up coming from Marstallplatz.  Nearest barrier-free WC: Restaurant Koi and Café Luitpold (both are accessible from the front,  right and left).", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "underground parking Am Salvatorplatz" }, "geometry": { "type": "Point", "coordinates": [ 11.581422, 48.14236 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.144495, "Longitude": 11.583641, "Name": "Englischer Garden", "Number": 11, "Type": "Park", "Address": "Prinzregentenstraße,  80538 München", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Monopteros, the Eisbach wave and many beer gardens\n\nToday, the people of Munich love the English Garden: on nice days they enjoy the sun on the meadows, play football or go for a walk. In winter, with good snow conditions and cold temperatures, you can even go cross-country skiing here or skate your laps on the Kleinhesseloher See lake. Or go sledding on the Monopteros hill. The view from this Greek-like temple is worthwhile at any time of year, because you have all the most important sights of Munich city centre at a glance: the Frauenkirche, the Theatinerkirche and the City Hall.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/5/2/5/1/521525-1-ger-DE/englischer-garten-mit-stadtpanorama-2171s-foto-joerg-lutz.jpg'", "imgsource": "Jörg Lutz", "Website": "https://www.schloesser.bayern.de/deutsch/garten/objekte/mu_engl.htm", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "MVV": "U3, U6, Bus 58, 68, 153, 154, N40, N41, N45 Universität, Bus 100 Haus der Kunst, Bus 54, 58, 68, 154, N43, N44 Chinesischer Turm, Bus 187 Rümelinstraße", "Access": "The ways in the park are covered with asphalt or gravel and suitable for wheelchairs.  barrier-free WC in the Zum Aumeister, in the Hirschau, at the Chinese Tower, in the Seehaus and in \"Tivoli Pavillon\" (Gyßlingstraße 10, next to Hirschau. WC accessible from left, front 80 cm,  grab handle only left.  Staff opens the door).", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "Behind the museum Haus der Kunst and at the beer gardens (see \"WC\" below)" }, "geometry": { "type": "Point", "coordinates": [ 11.583641, 48.144495 ] } },
      { "type": "Feature", "properties": { "Latitude": 48.1434189, "Longitude": 11.5877449, "Name": "Surfer's Site at the Eisbach", "Number": 12, "Type": "Park", "Address": "Prinzregentenstraße opposite number 22 in 80538 Munich", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The waves on the man-made Eisbach river at the entrance to the Englischer Garten (park) attract surfers and onlookers from around the world. The spot is famous throughout the world for being the largest, best and most consistent city centre location for river surfing.  People have been surfing here for 40 years.  ", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/0/2/7/2/1322720-1-ger-DE/rundgang-muenchen-74a7830-foto-frank-stolle-sm-3000.jpg' alt='Surfer at the Eisbach River'", "imgsource": "Frank Stolle", "Website": "https://www.muenchen.travel/pois/sport-freizeit/eisbachwelle", "wc": null, "Access": "Wheelchair friendly viewing from the bridge on Prinzregentenstrasse.", "parking": null, "parking_text": null, "Phone": null, "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "image2": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.587745757417512, 48.143418882923648 ] } }
      ]
  }
  
  
  ;

  console.log(attractions)

/**USE properties.Number instead of assigning a new unique id!!!
 * Assign a unique id to each attraction. You'll use this `id`
 * later to associate each point on the map with a listing
 * in the sidebar.
 */
// attractions.features.forEach((attraction, i) => {
//   attractions.properties.id = i;
// });

// CHANGE BASEMAP STYLE
// Create constants for layerlist and inputs for different basemap styles in the html file, look at CityTours.html line 63
// const layerList = document.getElementById('menu'); //'menu' is the div element id
// const inputs = layerList.getElementsByTagName('input'); //'input', <input> tag specifies an input field where the user can enter data

// All sources and layers are removed when new style is loaded!!
// So we need to add sources and layers each time new style is loaded.
// We will create the functions addSource() and addLayer() to do this each time we load a new style.

function addSource() { 
  // For each new source, we need to create map.addSource()

  map.addSource('Munich-Intro-Route',{
      type: 'geojson',
      data:'/data/Munich-Intro-Route.geojson'
  
      });


  //Add source before this//          
  }

function addLayer() {
// For each source we added, we need to use map.addLayer() to add it to the map.
// map.setLayerZoomRange is used to set the layer zoom range

    
    map.addLayer({
        id: 'Munich-Intro-Route',
        type: 'line',
        source: 'Munich-Intro-Route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
        'line-color': '#48a2b8', // ['get','color']
        'line-width': 6,
        'line-opacity': 0.7,
        'line-blur': 1.5
        }
        });
    map.setLayerZoomRange('Munich-Intro-Route', 12, 22);



 //Add layer before this// 
}

// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function(){
  const layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style.
  let firstSymbolId;
  for (const layer of layers) {
  if (layer.type === 'symbol') {
  firstSymbolId = layer.id;
  break;
  }
  }


      map.addSource('munich-intro-tour-points', {
        'type': 'geojson',
        'data': attractions
      });
    
        /**
       * Add all the things to the page:
       * - The location listings on the side of the page
       * - The markers onto the map
       */
        buildLocationList(attractions);
        addMarkers();
        addSource();
        // addLayer();


    //whatever layers you want to toggle go in to this function
    // toggleLayer(['munich-intro-tour-points'], 'Points');
    // toggleLayer(['walking-routes','old-town-route'], 'Routes');

    // function toggleLayer(ids, name) {
    //     var link = document.createElement('a');
    //     link.href = '#';
    //     link.className = 'active';
    //     link.textContent = name;

    //     link.onclick = function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         for (layers in ids){
    //             var visibility = map.getLayoutProperty(ids[layers], 'visibility');
    //             if (visibility === 'visible') {
    //                 map.setLayoutProperty(ids[layers], 'visibility', 'none');
    //                 this.className = '';
    //             } else {
    //                 this.className = 'active';
    //                 map.setLayoutProperty(ids[layers], 'visibility', 'visible');
    //             }
    //         }

    //     };

    //     var layers = document.getElementById('layernav');
    //     layers.appendChild(link);

    //   }

});

//Change Basemap Style
//<<< Messes up click/hover functions on list locations !!!>>>

for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/' + layerId);
};
}


      /**
       * Add a marker to the map for every attraction listing.
       **/
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        for (const marker of attractions.features) {
          /* Create a div element for the marker. */
          const el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = `marker-${marker.properties.Number}`;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
          el.textContent = marker.properties.Number;

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
           **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
          

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked attraction
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
           **/
          el.addEventListener('click', (e) => {
            /* Fly to the point */
            flyToattraction(marker);
            /* Close all other popups and display popup for clicked attraction */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('activeList');
              activeItem[0].classList.remove('active');
            }
            const listing = document.getElementById(
              `listing-${marker.properties.Number}`
            );
            listing.classList.add('active');

            //Highlight marker on click
            const activeMarker = document.getElementsByClassName('activeClick');
            e.stopPropagation();
            if (activeMarker[0]) {
              activeMarker[0].classList.remove('activeClick');
            }
            const markerOn = document.getElementById(
              `marker-${marker.properties.Number}`
            );
            markerOn.classList.add('activeClick');

          });

          //Highlight listing in sidebar when hover on marker
        el.addEventListener('mouseenter', (e) => {
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName('activeList');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('activeList');
            }
            const listing = document.getElementById(
              `listing-${marker.properties.Number}`
            );
            listing.classList.add('activeList');

        });

        //Stop highlighting sidebar on mouse leave marker
        el.addEventListener('mouseleave', (e) => {
          const activeItem = document.getElementsByClassName('activeList');
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('activeList');
          }

      });

          // Create function for when pop.remove() then all active markers will be removed.
          // const popup = new mapboxgl.Popup({ closeOnClick: true });

        el.addEventListener('popup.close', function() {
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('activeList');
            activeItem[0].classList.remove('active');
            activeItem[0].classList.remove('activeClick');
          }

    });


        }
      }

      /**
       * Add a listing for each attraction to the sidebar.
       **/
      function buildLocationList(attractions) {
        for (const attraction of attractions.features) {
          /* Add a new listing section to the sidebar. */
          const listings = document.getElementById('listings');
          const listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = `listing-${attraction.properties.Number}`;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';

          /* Add the link to the individual listing created above. */
          const link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = `link-${attraction.properties.Number}`;
          link.innerHTML = `<span class="pin"><img src="/images/location-pin-solid-list.svg" width="20"><span class="pinTitle">${attraction.properties.Number}&nbsp;&nbsp;&nbsp;</span></span> ${attraction.properties.Name}&nbsp;&nbsp;`;

          if (attraction.properties.MustSee){
            link.innerHTML += `${attraction.properties.MustSee}`
          };

          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.className = 'details';
          details.innerHTML = `
          <ul>
          <li><i><b><font color="#9f9f9f"><font size=normal>${attraction.properties.Type}</font color></font size></b></i></li>
          <li>${attraction.properties.Address}</li>
          <li><i>${attraction.properties.Hours}</i>&nbsp;
          <a href=${attraction.properties.Website}><i class="fa-solid fa-link"></i></a></li></ul>`
      
          if (attraction.properties.parking_text){
            details.innerHTML += `<ul><li><b>Disabled Parking:</b>&nbsp;${attraction.properties.parking_text}</li></ul>`
          };

          if (attraction.properties.MVV){
            details.innerHTML += `<ul><li><b>MVV:</b>&nbsp;${attraction.properties.MVV}</li></ul>`
          };

          details.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`

          if (attraction.properties.wheelchair) {
            details.innerHTML += `${attraction.properties.wheelchair}&nbsp;&nbsp;`
          };

          if (attraction.properties.elderly) {
            details.innerHTML += `${attraction.properties.elderly}&nbsp;&nbsp;`
          };
          if (attraction.properties.stroller) {
            details.innerHTML += `${attraction.properties.stroller}&nbsp;&nbsp;`
          };

          if (attraction.properties.wc){
            details.innerHTML += `${attraction.properties.wc}&nbsp;&nbsp;`
          };
          if (attraction.properties.parking){
            details.innerHTML += `${attraction.properties.parking}&nbsp;&nbsp;`
          };
          if (attraction.properties.elevator) {
            details.innerHTML += `${attraction.properties.elevator}&nbsp;&nbsp;`
          };
          if (attraction.properties.guideDog) {
            details.innerHTML += `${attraction.properties.guideDog}&nbsp;&nbsp;`
          };
          if (attraction.properties.audioGuide) {
            details.innerHTML += `${attraction.properties.audioGuide}&nbsp;&nbsp;`
          };
          if (attraction.properties.guidedTour) {
            details.innerHTML += `${attraction.properties.guidedTour}&nbsp;&nbsp;`
          };
          // if (attraction.properties.Phone) {
          //   details.innerHTML += `${attraction.properties.Phone}`;
          // };
          

          /**
           * Listen to the element and when it is clicked, do four things:
           * 1. Update the `currentFeature` to the attraction associated with the clicked link
           * 2. Fly to the point
           * 3. Close all other popups and display popup for clicked attraction
           * 4. Highlight listing in sidebar (and remove highlight for all other listings)
           * 5. Highlight listing in map (and remove highlight for all other listings)
           **/
          link.addEventListener('click', function () {
            for (const feature of attractions.features) {

              if (this.id === `link-${feature.properties.Number}`) {
                flyToattraction(feature);
                closePopUp(feature);

            //Remove highlight for all other markers
            const activeMarker = document.getElementsByClassName('activeClick');
            if (activeMarker[0]) {
              activeMarker[0].classList.remove('activeClick');
              // activeMarker[0].classList.remove('activeHover');

            }
            // If marker ID matches the listing, then add activeClick class to highlight the marker.
            const markerOn = document.getElementById(
              `marker-${feature.properties.Number}`
            );
            markerOn.classList.add('activeClick');
            //Remove activeHover class when marker highlighted with click
            markerOn.classList.remove('activeHover');

            } // end of IF statement

            // Highlight listing in sidebar:
            // If activeItem doesn't match listing that is clicked on, then remove 'active' class.
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            //For the element associated with the click listing, add 'active' class.
            this.parentNode.classList.add('active');

            } 

          });


          //Listen to the element and when it is hovered on, do this:
          //1. Update the `currentFeature` to the attraction associated with the clicked link
          //2. Highlight listing in map
          //3. Stop highlighting listing when mouse leaves
          //   - BUG: Listing is still highlighted on hover even after it is highlighted on click.

          link.addEventListener('mouseenter', function() {

            for (const feature of attractions.features) {
              if (this.id === `link-${feature.properties.Number}`) {

              //Highlight marker on hover on listing in the sidebar and remove highlight for other markers
              const activeMarker = document.getElementsByClassName('activeHover');
              if (activeMarker[0]) {
                activeMarker[0].classList.remove('activeHover');
              }

              const markerOn = document.getElementById(
                `marker-${feature.properties.Number}`
              );
              markerOn.classList.add('activeHover');

            // If listing is already active from mouseclick on marker or listing, remove activeHover:
              const activeListing = document.getElementsByClassName('activeList');
              if (activeListing === true) {
                activeListing.classList.remove('activeHover');
              };

              const activeListingmarker = document.getElementsByClassName('activeClick');
              if (activeListingmarker === true) {
                activeListingmarker.classList.remove('activeHover');
              };

              }//end of IF statement


            }

          });

          // On 'mouseleave' listings, no markers are highlighted.
          link.addEventListener('mouseleave', function() {
            for (const feature of attractions.features) {
              if (this.id === `link-${feature.properties.Number}`) {
                const markerOff = document.getElementById(
                  `marker-${feature.properties.Number}`
                );
                markerOff.classList.remove('activeHover');
              }
            }

          });
        }
      }

      /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
       **/
      function flyToattraction(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          offset: [-150, -150],
          zoom: 16.5
        });
      }

      /**
       * Create a Mapbox GL JS `Popup`.
       **/
      function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(
            `<h3>${currentFeature.properties.Name}</h3>
            <img id="img" ${currentFeature.properties.image} style="width:100%;max-width:350px">
            <p>${currentFeature.properties.Description}<br><br>
            <b>Access:</b>&nbsp;${currentFeature.properties.Access}</p>
            <img id="img2" ${currentFeature.properties.image2} style="width:100%;max-width:350px">
            <p>
            <font size= 1><i>Image Sources:&nbsp;${currentFeature.properties.imgsource}<br>
            Text Sources: Wikipedia, Muenchen.de, simplyMunich.
            </i></font size>
            </p>`
          )
          .addTo(map);
        // Set an event listener that will fire
        // any time the popup is closed
        popup.on('close', () => {
          console.log('popup was closed');
          });
      }

       /**
       * Close all other popups and display marker for clicked attraction in the sidebar.
       **/
      function closePopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)

      }



