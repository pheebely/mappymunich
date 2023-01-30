const home = [11.573853, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/pheebely/cld9b4izo001w01r0ga1p0wb3',
center: home,
zoom: 15,
minZoom: 7,
maxZoom: 18,
pitch: 40, // pitch in degrees
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
const wheelchair = "<i class=\"fa-brands fa-accessible-icon\"></i>"
const elderly = "<i class=\"fa-solid fa-person-cane\"></i>"
const stroller = "<i class=\"fa-solid fa-baby-carriage\"></i>"
const elev = "<i class=\"fa-solid fa-elevator\"></i>"
const fire = "<i class=\"fa-solid fa-fire\"></i>"

// Add attractions layer as constant
// https://github.com/pheebely/mappymunich/blob/main/data/Munich-Intro.geojson
const attractions = 
{
  "type": "FeatureCollection",
  "name": "Old-Town",
  "features": [
  { "type": "Feature", "properties": { "Latitude": 48.137245, "Longitude": 11.57551, "Name": "Marienplatz", "Number": 1, "Type": "Plaza", "Address": "Marienplatz, 80331 München", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Marienplatz is a square in the heart of Munich that has been the main square of the city since 1158. As such, it was the main venue where public events, tournaments and executions traditionally took place.<br><br>Ideal location for the very first encounter with Munich. Historic, architecturally attractive and vibrant, filled with people (locals and tourists alike) throughout the day, it never lacks excitement. Also, just like the rest of Munich, it's spotlessly clean. From November to December, the Christmas Market is one of a kind and truly magical.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-07/marienplatz-750.jpg?h=5d310a80' alt='Marienplatz plaza in Munich Germany with Tourists'", "imgsource": "Shutterstock", "Website": "https://www.muenchen.de/en/sights/marienplatz-munichs-old-town", "Phone": null, "wc": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": null, "parking_text": "3 spaces Sparkassenstraße 2, 4 spaces Dienerstraße, 3 spaces Burgstraße 3", "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "S1-S8 (coming from central station exit left to the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "This disabled or wheelchair-accessible toilet for everyone is located on the mezzanine floor at Marienplatz (direction Viktualienmarkt) in the general toilet facility." }, "geometry": { "type": "Point", "coordinates": [ 11.57551, 48.137245 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.137348, "Longitude": 11.576202, "Name": "Neues Rathaus", "Number": 2, "Type": "Landmark", "Address": "Marienplatz 8, 80331 München", "Hours": "Oct-Apr Mo-Fr 10:00-17:00; May-Sep 10:00-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "<b>Free access to the tower for people with disabilities and their companion.</b><br><br>With its ornate, Neo-Gothic facade, the Neues Rathaus (New Town Hall) at Marienplatz (square) looks slightly older than it actually is. As a matter of fact, initial construction took place between 1867 and 1905 after the neighbouring Altes Rathaus (Old Town Hall) became too small for Munich’s city council. <br><br> One of the most important attractions is the Glockenspiel in the hall's tower, whose daily performances at 11 a.m. and 12 a.m. (and 5 p.m. in the summer months) attract audiences from around the world.", "image": "src='../images/neuesrathaus.jpg' alt='Neues Rathaus building from the front in Munich Germany'", "imgsource": "Jörg Lutz", "Website": "https://stadt.muenchen.de/infos/neues-rathaus-aussen.html", "Phone": "+49 89 233 00", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": null, "parking_text": "3 spaces Sparkassenstraße 2, 4 spaces Dienerstraße, 3 spaces Burgstraße 3", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "S1-S8 (coming from central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Free access to the tower for people with disabilities and their companion.<br>At ground level over the passage to the formal courtyard, ramp with 21 % gradient and 2 handrails to the 1st lift, after the 2nd lift ramp with 21 % gradient and upwards left handrail. Through the left door to the observation platform, there a ramp with 24 % gradient without handrails. Narrowest part of the platform 75 cm." }, "geometry": { "type": "Point", "coordinates": [ 11.576202, 48.137348 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.136663, "Longitude": 11.576848, "Name": "Altes Rathaus", "Number": 3, "Type": "Landmark", "Address": "Marienplatz 15, 80331 München", "Hours": "Mo-Su 10:00-17:30", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Once the seat of the Munich Municipality,  prior to the construction of Neues Rathaus in 1874,  Altes Rathaus (the Old Town Hall) stands on the eastern side of Marienplatz.  It was left untouched, unlike many other buildings that were demolished to make way for the building. Due to its plain facade,  many people believe that the Alte Rathaus (Old Town Hall) is newer than the ornately decorated Neue Rathaus (New Town Hall),  when in fact it is over 400 years older. ", "image": "src='https://stadt.muenchen.de/.imaging/mte/lhm/image-aspect-ratio-3-2-1216w/dam/Home/Stadtinfos/Presse-Service/Presse_Fotos/Rathaus/altes_rathaus_02/jcr:content/altes_rathaus_02.jpg'", "imgsource": "muenchen.de", "Website": "https://www.marienplatz-muenchen.de/altes-rathaus/", "Phone": null, "wc": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": null, "parking_text": "3x barrier-free parking possible", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "S1-S8 (from the main station to get off to the lift left!), U3, U6, bus 132 Marienplatz\n", "Access": "Wheelchair users accessible by elevator (access to the 1st floor through the service area).  " }, "geometry": { "type": "Point", "coordinates": [ 11.576848, 48.136663 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.136503, "Longitude": 11.576054, "Name": "Peterskirche", "Number": 4, "Type": "Religious", "Address": "Rindermarkt 1, 80331 München", "Hours": "Mo-Su 07:30-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "St. Peter's Church is a Roman Catholic parish church in the inner city of Munich, southern Germany. Its 91-metre tower is commonly known as \"Alter Peter\"—Old Peter—and is emblematic of Munich. St Peter's is the oldest recorded parish church in Munich and presumably the originating point for the whole city.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/6/7/4/2/2662476-1-ger-DE/Alter%20Peter%20mit%20Sonnenstern%2C%20©%20München%20Tourismus%2C%20Joerg%20Lutz.jpg'", "imgsource": "Jörg Lutz,  simplyMunich", "Website": "https://alterpeter.de/pfarrkirche-st-peter/", "Phone": "+49 89 210237 760", "wc": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": null, "parking_text": "2 spaces Rindermarkt 14, 3 spaces Rindermarkt 5", "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/st._peter.klein.jpg'", "MVV": "S1-S8 (coming from the central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Stepless. To Viktualienmarkt precipitous!" }, "geometry": { "type": "Point", "coordinates": [ 11.576054, 48.136503 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.135146, "Longitude": 11.576256, "Name": "Viktualienmarkt", "Number": 5, "Type": "Shopping", "Address": "Viktualienmarkt 3, 80331 München", "Hours": "Mo-Sa 08:00-20:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Viktualienmarkt is Munich’s largest market and a hub for the city’s foodies. Spread across 22,000 square meters, it features a huge range of fresh produce with much more than just fruit and vegetables: Bakers, butchers, fishmongers, delicatessens and flower stalls have turned Viktualienmarkt into a Munich landmark for more than 200 years.\n\nThe best thing: entry to the market is free. It also features food stalls and a comfy beer garden, complete with an authentic Bavarian Maibaum (Maypole).", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/20210422_viktualienmarkt_ansicht_blumen_spargel_anettegoettlicher-03441.jpg?h=0d497e6f'", "imgsource": "Anette Göttlicher", "Website": "https://www.muenchen.de/en/sights/attractions/viktualienmarkt-top-sight-munich", "Phone": "+49 89 890682 05", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": null, "guideDog": null, "parking_text": null, "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "Bus 52, 62, 132 Viktualienmarkt, Bus 52, 62 Blumenstraße, S1-S8 (coming from central station, exit left to access the elevator!), U3, U6, 132 Marienplatz", "Access": "Pavement: cobblestone,  tiling.<br> This public toilet is located at Viktualienmarkt, Westenriederstraße at the corner of Frauenstraße.\n\nThere is a ramp in front of the entrance.\n\nRamp: Length: 1.6 m, Slope: 9.4%" }, "geometry": { "type": "Point", "coordinates": [ 11.576256, 48.135146 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.135455, "Longitude": 11.572886, "Name": "Münchner Stadtmuseum", "Number": 6, "Type": "Museum", "Address": "Sankt-Jakobs-Platz 1, 80331 München<br><a href=\"https://youtu.be/dSa-w0AVmA4\">Video Directions</a>", "Hours": "Tu-Su 10:00-18:00", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Munich City Museum is the largest municipal museum in Germany. In its historical building parts from different eras, it unites a wide variety of collections under one roof. You can see art and design as well as culturally and historically interesting and everyday things with many exciting current references.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/nagy%20stadtmuseum%204343.jpg?h=84071268'", "imgsource": "Münchner Stadtmuseum", "Website": "https://www.muenchner-stadtmuseum.de/en/translate-to-englisch-information/translate-to-englisch-barrierefreiheit", "Phone": "+49 89 233223 70", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": "<i class=\"fa-solid fa-dog\"></i>", "parking_text": "1 space Rosental 7, underground parking Oberanger, 1 space Rindermarkt in front of \"Peter Hahn\", 3 spaces Rindermarkt 5", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "elderly": null, "stroller": null, "audioGuide": "<i class=\"fa-solid fa-headphones\"></i>", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stadtmuseum_eingang_oberanger_neu.klein.jpg' alt='Wheelchair entrance'", "MVV": "Bus 52, 62 St. Jakobs-Platz, U1, U2, U3, U6, U7, U8, Tram 16, 17, 18, 27, 28, N17, N27, Bus 52, 62, N40, N41, N45 Sendlinger Tor, S1-S8 (coming from central station- exit left to the elevator!), U3, U6, Bus 132 Marienplatz.", "Access": "At ground level coming from Oberanger (big metal gate) cross the court yard,  on the right,  ramp to the entrance,  heavy door.\n Elevators to all floors,  2 stair lifts (load capacity 340 kg and 300 kg) only with staff." }, "geometry": { "type": "Point", "coordinates": [ 11.572886, 48.135455 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.135184, "Longitude": 11.569654, "Name": "Asamkirche", "Number": 7, "Type": "Religious", "Address": "Sendlinger Str. 32, 80331 München", "Hours": "Su-Th 09:00-19:00 <br> Fr 13-18:00", "MustSee": " ", "wheelchair": null, "Description": "Wheelchair: Can only be viewed from the outside.  A hidden gem church in the middle of Munich's pedestrian zone. The St. John Nepomuk Church was designed by the Asam brothers as a magnificent private church in the style of the Bavarian late Baroque and is one of their masterpieces.", "image": "src='../images/asamkirche.jpg' alt='Asamkirche baroque architecture from the outside'", "imgsource": "Wikipedia.org", "Website": "https://alterpeter.de/nebenkirchen/#asamkirche", "Phone": "+49 89 236879 89", "wc": null, "parking": null, "guideDog": null, "parking_text": "Disabled parking spaces available free of charge:\nSt.-Jacobs-Platz 12 / Rosental 7 / Hackenstr. 1\nCar parks (not free of charge): Parkhaus Oberanger", "elevator": null, "guidedTour": null, "elderly": "<i class=\"fa-solid fa-person-cane\"></i>", "stroller": "<i class=\"fa-solid fa-baby-carriage\"></i>", "audioGuide": null, "image2": null, "MVV": "U1-U3, U6-U8,  Tram 16-19, 27-28,  N17,  N19,  N27,  Bus 53 Sendlinger Tor", "Access": "Wheelchair users can only view facade from the outside.  " }, "geometry": { "type": "Point", "coordinates": [ 11.569654, 48.135184 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.138169, "Longitude": 11.57152, "Name": "Kaufingerstrasse/Neuhauserstrasse", "Number": 8, "Type": "Shopping", "Address": "Kaufingerstraße 1 , 80331 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Roam through the pedestrian zone of Kaufingerstraße and Neuhauser Straße. Munich's central pedestrian zone consists of two large streets from Marienplatz to Stachus, Kaufingerstraße and Neuhauser Straße,  which merge in their course.  In addition to traditional houses and large chains,  there are many small shops and restaurants.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/kaufingerstraße-michael-tuerme.jpg?h=84071268'", "imgsource": "Lukas Fleischmann", "Website": "https://www.muenchen.de/en/sights/neuhauser-strasse-and-kaufingerstrasse-pedestrian-zone-munich", "Phone": null, "wc": null, "parking": null, "guideDog": null, "parking_text": null, "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "S1-S8 (coming from the central station exit left for the elevator), U3, U6, Bus 132 Marienplatz, S1-S8 (exit left to the elevator!), U4, U5, Tram 16, 18, 19, 20, 21, 27, 28, N17, N19, N20, N27, N40, N41, N45 Karlsplatz", "Access": "Pedestrian zone" }, "geometry": { "type": "Point", "coordinates": [ 11.57152, 48.138169 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.138676, "Longitude": 11.573637, "Name": "Frauenkirche", "Number": 9, "Type": "Religious", "Address": "Frauenplatz 1, 80331 München", "Hours": "Mo-Su 07:30-20:30", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Cathedral Church of Our Lady (Frauenkirche) is Munich's most famous church and its two towers are unmistakable landmarks of the city. ", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/201203_Frauenkirche_Panorma_Shutterstock_3061137.jpg?h=b78320da'", "imgsource": "Shutterstock,  simplyMunich", "Website": "https://www.muenchner-dom.de/home/", "Phone": "+49 89 2900820", "wc": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": null, "parking_text": "3 spaces Ettstraße 2, 7 spaces distributed in Maxburgstraße", "elevator": null, "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "elderly": null, "stroller": null, "audioGuide": null, "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/dom_rampe_steinklein.jpg'", "MVV": "S1-S8 (coming from the central station exit left for the elevator!), U3, U6, Bus 132 Marienplatz, S1-S8 (exit left to the elevator!), U4, U5, Tram 16, 17, 18, 19, 20, 21, 27, 28, N17, N19, N20, N27, N40, N41, N45 Karlsplatz.", "Access": "Ramp with an incline of 6 % at the northern porch (left side of the main entrace)" }, "geometry": { "type": "Point", "coordinates": [ 11.573638695454317, 48.138625607176756 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.139185, "Longitude": 11.566191, "Name": "Karlsplatz", "Number": 10, "Type": "Plaza", "Address": "Karlsplatz 1, 80335 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Karlsplatz, situated near the 14th century Karlstor gate, is the second largest square in Munich, after Marienplatz, and is popularly known as Stachus. Among other things adorning Stachus today is a modern fountain, built in the 1970s, with seats for shoppers and visitors to rest their feet in the summer. In the winter, the area surrounding the fountain becomes an ice skating rink.  Underground there is another large shopping center and Stachus Square itself serves as the major hub for Munich’s tramway system.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/201212_stachus-sommer_shutterstock-422259487.jpg?h=84071268'", "imgsource": "trabantos / Shutterstock.com", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/orte/120328.html", "Phone": null, "wc": null, "parking": null, "guideDog": null, "parking_text": null, "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null, "MVV": "S1-S8 (exit left to the elevator!), U4, U5, Tram 16, 17, 18, 19, 20, 21, 27, 28, N17, N19, N20, N27, N40, N41, N45 Karlsplatz.", "Access": "Western entrance to the pedestrian zone." }, "geometry": { "type": "Point", "coordinates": [ 11.566191, 48.139185 ] } }

  ]
  }
  
  
  
  ;

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
  
  map.addSource('old-town-route', { 
      'type': 'geojson',
      'data': {
          'type': 'Feature',
          'properties': {'name': "Walking tour route line", 'description': "Old Town Route", 'color': '#f1bc41'},
          'geometry': {
          'type': 'MultiLineString',
          'coordinates': [ 
              [ 
                  [ 11.571508104706643, 48.138139021750831 ], [ 11.5704909, 48.1383712 ], [ 11.5696379, 48.1384338 ], [ 11.5684488, 48.1386454 ], [ 11.5673664, 48.1388956 ], [ 11.5671385, 48.1389618 ], [ 11.5663097, 48.139155099999989 ] ], [ [ 11.570099734088437, 48.135190253986437 ], [ 11.57021046771742, 48.13523359448854 ] ], [ [ 11.57021046771742, 48.13523359448854 ], [ 11.570128289798038, 48.135201629235006 ], [ 11.570099734088437, 48.135190253986437 ] ], [ [ 11.570099734088437, 48.135190253986437 ], [ 11.570081066774131, 48.135182817808413 ], [ 11.569859911579684, 48.135096170879052 ], [ 11.5697442, 48.1350511 ], [ 11.570099734088437, 48.135190253986437 ] ], [ [ 11.571563280411418, 48.135763077554728 ], [ 11.571383824307015, 48.135692262661919 ], [ 11.571136741247141, 48.135596117923029 ], [ 11.571011795415281, 48.135546764266344 ], [ 11.570761355864329, 48.135448568738596 ], [ 11.570613474271058, 48.135391099209421 ], [ 11.5703469, 48.135286599999986 ], [ 11.570282986528211, 48.135261802578867 ], [ 11.57021046771742, 48.13523359448854 ] ], [ [ 11.57021046771742, 48.13523359448854 ], [ 11.571563280411418, 48.135763077554728 ] ], [ [ 11.571508104706643, 48.138139021750831 ], [ 11.571702257293273, 48.138324402193028 ] ], [ [ 11.571684195117188, 48.13580945398963 ], [ 11.57169777581063, 48.135814692877574 ], [ 11.571707228038619, 48.135818503064989 ], [ 11.57171152997878, 48.135822337178652 ], [ 11.571714111569888, 48.135826995909824 ], [ 11.571715539720834, 48.135832073517406 ], [ 11.571715230668554, 48.135837813052774 ], [ 11.571714297392283, 48.135843492599044 ], [ 11.571710085281298, 48.135850730667428 ], [ 11.571705771272324, 48.135855929949265 ], [ 11.571696178000106, 48.135862267992181 ], [ 11.571680747794991, 48.135873839420256 ], [ 11.571658241393564, 48.135891975965841 ], [ 11.571638075734546, 48.135910056447599 ], [ 11.571624631954045, 48.135922110100232 ], [ 11.57161475446263, 48.135935259147502 ], [ 11.571599908880934, 48.135954395744236 ], [ 11.571585239299255, 48.135977054175328 ], [ 11.571568698550509, 48.135997403987901 ], [ 11.571537253491632, 48.136035716442009 ], [ 11.571498382438484, 48.13606596836209 ], [ 11.571464538122507, 48.136091406670531 ], [ 11.571432388924752, 48.136115631752006 ], [ 11.571394978238139, 48.136139974639278 ], [ 11.571369433598733, 48.136155824999449 ], [ 11.571357860843525, 48.136170187242577 ], [ 11.571349795724238, 48.136184470943171 ], [ 11.571355937170058, 48.136201962313926 ], [ 11.571363773776858, 48.136218240467763 ], [ 11.571375059368384, 48.136233266133111 ], [ 11.571441828169959, 48.136269379336341 ], [ 11.571471121386208, 48.136293403831509 ], [ 11.571604548349345, 48.136398539822551 ], [ 11.571694593079215, 48.136478791490525 ], [ 11.571786743982409, 48.136566047474943 ], [ 11.571817615334805, 48.136586510762172 ], [ 11.571879064721655, 48.136621567585323 ], [ 11.57195331916771, 48.136666914917299 ], [ 11.572032489789619, 48.136740358311663 ], [ 11.571708901019454, 48.136990942585413 ], [ 11.571763743021018, 48.137034024679949 ], [ 11.5713259, 48.1373836 ], [ 11.5714278, 48.137752399999989 ], [ 11.5713634, 48.1378562 ], [ 11.571508081790665, 48.138138999870236 ], [ 11.571508104706643, 48.138139021750831 ] ], [ [ 11.571702257293273, 48.138324402193028 ], [ 11.57167790698889, 48.138301060783704 ], [ 11.571611392163058, 48.138237633016438 ], [ 11.571560013346712, 48.138188584503681 ], [ 11.5715082, 48.138139 ], [ 11.571508104706643, 48.138139021750831 ] ], [ [ 11.571563280411418, 48.135763077554728 ], [ 11.571638538049408, 48.13579253295908 ] ], [ [ 11.571638538049408, 48.13579253295908 ], [ 11.571635605256553, 48.135791452940673 ], [ 11.571603072113822, 48.135778779696203 ], [ 11.571563280411418, 48.135763077554728 ] ], [ [ 11.571668658761411, 48.135803678116176 ], [ 11.571653547662674, 48.135798060338409 ], [ 11.571638538049408, 48.13579253295908 ] ], [ [ 11.571638538049408, 48.13579253295908 ], [ 11.571652774499679, 48.135798105023397 ], [ 11.571668658761411, 48.135803678116176 ] ], [ [ 11.571668658761411, 48.135803678116176 ], [ 11.571674888206983, 48.135805863756197 ], [ 11.571684195117188, 48.13580945398963 ] ], [ [ 11.571684195117188, 48.13580945398963 ], [ 11.571668658761411, 48.135803678116176 ] ], [ [ 11.572107746903706, 48.135253525810761 ], [ 11.572093367353515, 48.13527823618233 ], [ 11.572071300869345, 48.135315885446751 ], [ 11.572043057923167, 48.135371932430751 ], [ 11.5720126, 48.1354209 ], [ 11.5719348, 48.1355211 ], [ 11.5719026, 48.1355497 ], [ 11.571698272937578, 48.135814687630663 ], [ 11.571684195117188, 48.13580945398963 ] ], [ [ 11.571702257293273, 48.138324402193028 ], [ 11.57188196110382, 48.13849574452864 ] ], [ [ 11.57188196110382, 48.13849574452864 ], [ 11.571809323043972, 48.138426818231032 ], [ 11.57175423705579, 48.138374149961038 ], [ 11.571702257293273, 48.138324402193028 ] ], [ [ 11.571961335578315, 48.138562104586242 ], [ 11.5719454, 48.1385489 ], [ 11.571894477012265, 48.138507620881505 ], [ 11.57188196110382, 48.13849574452864 ] ], [ [ 11.57188196110382, 48.13849574452864 ], [ 11.5718945, 48.138507699999984 ], [ 11.571961335578315, 48.138562104586242 ] ], [ [ 11.571961335578315, 48.138562104586242 ], [ 11.5721144, 48.138686699999987 ], [ 11.5722915, 48.138769 ], [ 11.572372553502261, 48.138801863903375 ] ], [ [ 11.572372553502261, 48.138801863903375 ], [ 11.5722915, 48.1387708 ], [ 11.5721117, 48.1386867 ], [ 11.571961335578315, 48.138562104586242 ] ], [ [ 11.572107691925771, 48.135253517730547 ], [ 11.572107746903706, 48.135253525810761 ] ], [ [ 11.572107746903706, 48.135253525810761 ], [ 11.572458850760365, 48.135305128240731 ], [ 11.57261731200569, 48.135364486113623 ], [ 11.572779872725576, 48.135437477245119 ], [ 11.572877853567098, 48.135483320655467 ] ], [ [ 11.575784608699751, 48.137036400037893 ], [ 11.5757733, 48.137039699999988 ], [ 11.5757519, 48.1368965 ], [ 11.5755588, 48.136739 ], [ 11.5760952, 48.1366459 ], [ 11.576342, 48.1366173 ], [ 11.5765136, 48.1365672 ], [ 11.5766102, 48.1364741 ], [ 11.5765995, 48.1364025 ], [ 11.5765673, 48.1363309 ], [ 11.5764814, 48.1362808 ], [ 11.5763849, 48.1362378 ], [ 11.5762883, 48.136237800000011 ], [ 11.5761918, 48.1362521 ], [ 11.57646, 48.1358798 ], [ 11.5765887, 48.1357581 ], [ 11.576687039525911, 48.135663859445899 ], [ 11.576814, 48.135600599999982 ], [ 11.576714342775684, 48.135507430360178 ], [ 11.576643756550299, 48.135413466356425 ], [ 11.576605091678633, 48.135327718627629 ], [ 11.576582041870067, 48.135230793617581 ], [ 11.576565930788828, 48.135151306645561 ], [ 11.576563900079671, 48.135110751296907 ], [ 11.576571290223733, 48.13505645093349 ], [ 11.576557345296999, 48.135020222996438 ], [ 11.576527988593314, 48.134999227851196 ], [ 11.57647702608635, 48.134990897730184 ], [ 11.5763819, 48.1349993 ], [ 11.576193555775113, 48.135022971336298 ], [ 11.576001, 48.1350888 ], [ 11.5758562, 48.1349617 ], [ 11.575791857866781, 48.134995441464845 ], [ 11.5757275, 48.1350244 ], [ 11.575337614911396, 48.135171344069263 ], [ 11.575305670759667, 48.135206783481486 ], [ 11.5753019647053, 48.135236381163921 ], [ 11.575288069130265, 48.135269679658826 ], [ 11.5752607, 48.1352893 ], [ 11.5751213, 48.1352893 ], [ 11.574544579081289, 48.135326508209758 ], [ 11.574096365727486, 48.135395003954244 ], [ 11.574053676223, 48.135342417814755 ], [ 11.573910946944165, 48.135177579297945 ], [ 11.573822764428112, 48.135087535120384 ], [ 11.573724027623831, 48.134965720234646 ], [ 11.5735388, 48.1347057 ], [ 11.573513625829465, 48.134678997133236 ], [ 11.573485281388262, 48.134652128666936 ], [ 11.573462059303019, 48.13463378941421 ], [ 11.573424726444037, 48.134614980557949 ], [ 11.573386535021299, 48.134602477484528 ], [ 11.573347445767176, 48.134595495253649 ], [ 11.5733108, 48.134591199999988 ], [ 11.573289594484084, 48.134588933442295 ], [ 11.573261451424653, 48.134589564086092 ], [ 11.573229947490368, 48.134593413311293 ], [ 11.573199733933951, 48.134599591071265 ], [ 11.5731807, 48.1346091 ], [ 11.573167646129157, 48.134615240652771 ], [ 11.573142437072336, 48.134627592813558 ], [ 11.573127349904722, 48.134631074153184 ], [ 11.5731083, 48.1346314 ], [ 11.573091857045917, 48.134625582888759 ], [ 11.573070317985382, 48.134617421497524 ], [ 11.573046590672941, 48.134612452410707 ], [ 11.5730184, 48.1346091 ], [ 11.572992532027426, 48.134611306205173 ], [ 11.572971699456744, 48.134617273713822 ], [ 11.5729464118543, 48.134628055952511 ], [ 11.5727717, 48.1346941 ], [ 11.572526224528888, 48.134782131456035 ], [ 11.572480519400823, 48.134803735191305 ], [ 11.572420886342076, 48.134840862109911 ], [ 11.572379499555344, 48.13486863250457 ], [ 11.572344788855645, 48.134896253337452 ], [ 11.572309988760392, 48.134922086608931 ], [ 11.572283110639214, 48.134945952866154 ], [ 11.572258992306745, 48.134971546851745 ], [ 11.572234918628581, 48.134998034608309 ], [ 11.572214537871451, 48.135018176205712 ], [ 11.572200967281931, 48.135040849587519 ], [ 11.572189531014519, 48.135052737843147 ], [ 11.572180854558029, 48.135066353833842 ], [ 11.572171061845456, 48.135088457020217 ], [ 11.572156754923952, 48.135117145419031 ], [ 11.572148212151388, 48.135140031118787 ], [ 11.572140919331341, 48.135163699333283 ], [ 11.572130847884916, 48.135204450548891 ], [ 11.572120088449216, 48.135231438458931 ], [ 11.572110093336947, 48.13524949360972 ], [ 11.572107746903706, 48.135253525810761 ] ], [ [ 11.572451981474918, 48.138832304819537 ], [ 11.572372553502261, 48.138801863903375 ] ], [ [ 11.572372553502261, 48.138801863903375 ], [ 11.5724417, 48.138829899999983 ], [ 11.572451981474918, 48.138832304819537 ] ], [ [ 11.572451981474918, 48.138832304819537 ], [ 11.572689168420036, 48.138887782444002 ] ], [ [ 11.572689168420036, 48.138887782444002 ], [ 11.5724551, 48.1388335 ], [ 11.572451981474918, 48.138832304819537 ] ], [ [ 11.572854593978168, 48.138926146028439 ], [ 11.572689168420036, 48.138887782444002 ] ], [ [ 11.572689168420036, 48.138887782444002 ], [ 11.5728547, 48.1389265 ], [ 11.572854593978168, 48.138926146028439 ] ], [ [ 11.572820623748518, 48.138812730755042 ], [ 11.572817287342557, 48.138801591607667 ] ], [ [ 11.572817287342557, 48.138801591607667 ], [ 11.572817217188367, 48.138801600158452 ], [ 11.572820623748518, 48.138812730755042 ] ], [ [ 11.572817287342557, 48.138801591607667 ], [ 11.5728172, 48.138801299999983 ], [ 11.572929622207864, 48.138787502916394 ], [ 11.572931727499329, 48.138787643005095 ] ], [ [ 11.572931727499329, 48.138787643005095 ], [ 11.572817287342557, 48.138801591607667 ] ], [ [ 11.572820623748518, 48.138812730755042 ], [ 11.572855391517905, 48.138926330984638 ], [ 11.572854593978168, 48.138926146028439 ] ], [ [ 11.572854593978168, 48.138926146028439 ], [ 11.572820623748518, 48.138812730755042 ] ], [ [ 11.572931727499329, 48.138787643005095 ], [ 11.573096719128106, 48.138798621752514 ] ], [ [ 11.573096719128106, 48.138798621752514 ], [ 11.572933609856417, 48.138787413572949 ], [ 11.572931727499329, 48.138787643005095 ] ], [ [ 11.573096719128106, 48.138798621752514 ], [ 11.573109867276882, 48.138799496646627 ], [ 11.573421632006932, 48.138813123955892 ], [ 11.573475941255541, 48.138815742425159 ] ], [ [ 11.573475941255541, 48.138815742425159 ], [ 11.5731095, 48.1387995 ], [ 11.573096719128106, 48.138798621752514 ] ], [ [ 11.573475941255541, 48.138815742425159 ], [ 11.573516328531493, 48.138817689659632 ], [ 11.5735923, 48.1388209 ], [ 11.573475941255541, 48.138815742425159 ] ], [ [ 11.5755158, 48.1374478 ], [ 11.5764278, 48.1372402 ], [ 11.5761918, 48.137104199999989 ], [ 11.575774407625007, 48.137039382209132 ], [ 11.575784608699751, 48.137036400037893 ] ], [ [ 11.575784608699751, 48.137036400037893 ], [ 11.576279622454255, 48.136891688248326 ] ], [ [ 11.576279622454255, 48.136891688248326 ], [ 11.57616587638814, 48.136925143310961 ], [ 11.575784608699751, 48.137036400037893 ] ], [ [ 11.576612635593648, 48.136787095574988 ], [ 11.576583393819835, 48.136802342828211 ], [ 11.576279622454255, 48.136891688248326 ] ], [ [ 11.576279622454255, 48.136891688248326 ], [ 11.576582115677432, 48.136803257704202 ], [ 11.576612635593648, 48.136787095574988 ] ], [ [ 11.576612635593648, 48.136787095574988 ], [ 11.5768685, 48.1366516 ], [ 11.576734354720484, 48.13672362875657 ], [ 11.576612635593648, 48.136787095574988 ] 
              ] 
          ]
      }}
  });

    //IF ADD THIS SOUCE THEN FUNCTION FOR LIST DOESNT WORK!
    // map.addSource('munich-intro-tour-points', {
    //     'type': 'geojson',
    //     'data': attractions
    //     });

  //Add source before this//          
  }

function addLayer() {
// For each source we added, we need to use map.addLayer() to add it to the map.
// map.setLayerZoomRange is used to set the layer zoom range

    map.addLayer({
        'id': 'old-town-route',
        'type': 'line',
        'source': 'old-town-route',
        'metadata': 'Old Town Route',
        'layer.minZoom': 9,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
        'line-color': '#48a2b8',
        'line-width': 6,
        'line-opacity': 0.7,
        },
        'metadata': {
          'displayName': 'Old Town Route',
          'showInLegend': true
    }
        });
    map.setLayerZoomRange('old-town-route', 12, 22);



 //Add layer before this// 
}


// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function(){
  const layers = map.getStyle().layers;


      map.addSource('old-town-points', {
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
          link.innerHTML = `<span class="pin"><img src="../images/location-pin-solid-list.svg" width="20"><span class="pinTitle">${attraction.properties.Number}&nbsp;&nbsp;&nbsp;</span></span> ${attraction.properties.Name}&nbsp;&nbsp;`;
          
          // if (attraction.properties.wheelchair !== null) {
          //   link.innerHTML += `${attraction.properties.wheelchair}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.wc){
          //   link.innerHTML += `${attraction.properties.wc}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.parking){
          //   link.innerHTML += `${attraction.properties.parking}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.elevator) {
          //   link.innerHTML += `${attraction.properties.elevator}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.guideDog) {
          //   link.innerHTML += `${attraction.properties.guideDog}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.audioGuide) {
          //   link.innerHTML += `${attraction.properties.audioGuide}&nbsp;&nbsp;`
          // };
          // if (attraction.properties.guidedTour) {
          //   link.innerHTML += `${attraction.properties.guidedTour}&nbsp;&nbsp;`
          // };


          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.className = 'details';
          details.innerHTML = `
          <ul>
          <li><i><b><font color="#9f9f9f">${attraction.properties.Type}</font color></b></i></li>
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
                createPopUp(feature); //closePopup(feature)

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
            <center><b>Click on the map or scroll back up to close!</center></b></i></font size>
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



