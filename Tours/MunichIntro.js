const home = [11.575853, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
center: home,
zoom: 14.5,
minZoom: 7,
maxZoom: 17,
pitch: 35, // pitch in degrees
projection: 'globe'
});



// Add the geocoder control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
collapsed: true
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
    zoom: 14.5,
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
  "name": "Munich-Intro",
  "features": [
  { "type": "Feature", "properties": { "Latitude": 48.137245, "Longitude": 11.57551, "Name": "Marienplatz", "Number": 1, "Type": "Plaza", "Address": "Marienplatz, 80331 München", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Marienplatz is a square in the heart of Munich that has been the main square of the city since 1158. As such, it was the main venue where public events, tournaments and executions traditionally took place.<br><br><strong>Why You Should Visit:</strong><br>Ideal location for the very first encounter with Munich. Historic, architecturally attractive and vibrant, filled with people (locals and tourists alike) throughout the day, it never lacks excitement. Also, just like the rest of Munich, it's spotlessly clean.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-07/marienplatz-750.jpg?h=5d310a80' alt='Marienplatz plaza in Munich Germany with Tourists'", "imgsource": "Shutterstock", "Website": "https://www.muenchen.de/en/sights/marienplatz-munichs-old-town" }, "geometry": { "type": "Point", "coordinates": [ 11.57551, 48.137245 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.137348, "Longitude": 11.576202, "Name": "Neues Rathaus", "Number": 2, "Type": "Landmark", "Address": "Marienplatz 8, 80331 München", "Hours": "Oct-Apr, Mo-Fr 10:00-17:00 <br> May-Sep, 10:00-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "<b>Free access to the tower for people with disabilities and their companion.</b><br><br>With its ornate, Neo-Gothic facade, the Neues Rathaus (New Town Hall) at Marienplatz (square) looks slightly older than it actually is. As a matter of fact, initial construction took place between 1867 and 1905 after the neighbouring Altes Rathaus (Old Town Hall) became too small for Munich’s city council. <br><br> One of the most important attractions is the Glockenspiel in the hall's tower, whose daily performances at 11 a.m. and 12 a.m. (and 5 p.m. in the summer months) attract audiences from around the world.", "image": "src='/images/NeuesRathaus.jpg' alt='Neues Rathause building from the front in Munich Germany'", "imgsource": "Jörg Lutz", "Website": "https://stadt.muenchen.de/infos/neues-rathaus-aussen.html", "Phone": "+49 89 233 00", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3 spaces Sparkassenstraße 2, 4 spaces Dienerstraße, 3 spaces Burgstraße 3", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "elderly": null, "stroller": null }, "geometry": { "type": "Point", "coordinates": [ 11.576202, 48.137348 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.136503, "Longitude": 11.576054, "Name": "Peterskirche", "Number": 3, "Type": "Religious", "Address": "Rindermarkt 1, 80331 München", "Hours": "Mo-Su 07:30-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "St. Peter's Church is a Roman Catholic parish church in the inner city of Munich, southern Germany. Its 91-metre tower is commonly known as \"Alter Peter\"—Old Peter—and is emblematic of Munich. St Peter's is the oldest recorded parish church in Munich and presumably the originating point for the whole city.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/6/7/4/2/2662476-1-ger-DE/Alter%20Peter%20mit%20Sonnenstern%2C%20©%20München%20Tourismus%2C%20Joerg%20Lutz.jpg'", "imgsource": "Jörg Lutz", "Website": "https://alterpeter.de/pfarrkirche-st-peter/", "Phone": "+49 89 210237 760", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "2 spaces Rindermarkt 14, 3 spaces Rindermarkt 5", "elderly": null, "stroller": null }, "geometry": { "type": "Point", "coordinates": [ 11.576054, 48.136503 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.135146, "Longitude": 11.576256, "Name": "Viktualienmarkt", "Number": 4, "Type": "Shopping", "Address": "Viktualienmarkt 3, 80331 München", "Hours": "Mo-Sa 08:00-20:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Viktualienmarkt is Munich’s largest market and a hub for the city’s foodies. Spread across 22,000 square meters, it features a huge range of fresh produce with much more than just fruit and vegetables: Bakers, butchers, fishmongers, delicatessens and flower stalls have turned Viktualienmarkt into a Munich landmark for more than 200 years.\n\nThe best thing: entry to the market is free. It also features food stalls and a comfy beer garden, complete with an authentic Bavarian Maibaum (Maypole).<br>Pavement: cobblestone,  tiling.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/20210422_viktualienmarkt_ansicht_blumen_spargel_anettegoettlicher-03441.jpg?h=0d497e6f'", "imgsource": "Anette Göttlicher", "Website": "https://www.muenchen.de/en/sights/attractions/viktualienmarkt-top-sight-munich", "Phone": "+49 89 890682 05", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "elderly": null, "stroller": null }, "geometry": { "type": "Point", "coordinates": [ 11.576256, 48.135146 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.137665, "Longitude": 11.579815, "Name": "Hofbräuhaus", "Number": 5, "Type": "Food", "Address": "Platzl 9, 80331 München", "Hours": "Mo-Su 09:00-24:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Hofbräuhaus is probably the best-known “watering hole” in Munich. Dating all the way back to 1589, this beer hall was founded by the Duke of Bavaria, Wilhelm V, and originally, surprisingly enough, was not open to the public. Luckily for today's tourists and locals, though, in 1828 it finally opened up to the masses. Today, this hospitable spot, thick with traditional atmosphere and friendly vibes, is where you can come to enjoy typical Bavarian food to your heart's content, listen to the Oompah band play loudly on stage, and gulp down the rich Hofbräuhaus beer in large, one-liter steins, which the Germans call a Mass.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/9/9/5/5/265599-1-ger-DE/film-hofbrauhaus-02-foto-redline-enterprises-sm-3000.jpg'", "imgsource": "simplyMunich", "Website": "https://www.hofbraeuhaus.de/de/willkommen.html", "Phone": "+49 89 290136 129", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "guideDog": "<i class=\"fa-solid fa-dog\"></i>", "parking_text": "In Maximilianstraße at the Nationaltheater,  north side, height stage entrance, 300 m away, five wheelchair parking spaces are designated." }, "geometry": { "type": "Point", "coordinates": [ 11.579815, 48.137665 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.139152, "Longitude": 11.580089, "Name": "Maximilianstrasse", "Number": 6, "Type": "Shopping", "Address": "Maximilianstr. 16, 80539 München", "Hours": "Open 24 Hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Maximilian street (Maximilianstraße) is one of the main streets of Munich and one of the most glamorous and luxurious streets in Germany.  You can stroll wonderfully here,  enjoy the flair of the street and marvel at the noble pieces in the artfully decorated shop windows.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Maximilianstraße_München_2006.jpg/640px-Maximilianstraße_München_2006.jpg' alt='Maximilianstrasse during the day.'", "imgsource": "Wikipedia.org", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/maximilianstrasse", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "At the Nationaltheater,  north side, height stage entrance, 300 m away, five wheelchair parking spaces are designated. Street parking also available." }, "geometry": { "type": "Point", "coordinates": [ 11.580089, 48.139152 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.140292, "Longitude": 11.578246, "Name": "Residenz München", "Number": 7, "Type": "Palace", "Address": "Residenzstraße 1, 80333 München", "Hours": "Open 24 Hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Users of wheelchairs need assistance! Group guided tours for persons with walking disabilities and sight impaired on special arrangement with the chateau administration. The king's building is accessible from Max-Joseph-Platz, you need assistance of the staff for the elevator.\nCuvillies-Theater: at ground level via Brunnenhof (cobblestone pavement!), bell 85 cm high, elevator to the first balcony.", "image": "src='https://www.residenz-muenchen.de/bilder/residenz/slider/079a_fassade_m-j-platz500.jpg?timestamp=1673217684277'", "imgsource": "Residenz München", "Website": "https://www.residenz-muenchen.de/englisch/tourist/index.htm", "Phone": "+49 89 29067-1", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "5 spaces in Maximilianstraße 8,<br>2 spaces at Max-Joseph-Platz 2", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "guidedTour": "<i class=\"fa-solid fa-flag\"></i>" }, "geometry": { "type": "Point", "coordinates": [ 11.578246, 48.140292 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.141756, "Longitude": 11.577346, "Name": "Feldherrnhalle", "Number": 8, "Type": "Monument", "Address": "Residenzstraße 1, 80333 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The Feldherrnhalle is located at the southern end of Odeonsplatz, between Theatinerstraße and Residenzstraße. The monumental hall was built between 1841 and 1844 by the famous architect Friedrich von Gärtner, commissioned by King Ludwig I.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/feldherrnhalle-sommerabend.jpg?h=19f14c2c' alt='Feldhernnhalle monument at night'", "imgsource": "Michael Hofmann", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/bauwerke-und-denkmaeler/feldherrnhalle", "parking": null, "parking_text": null }, "geometry": { "type": "Point", "coordinates": [ 11.577346, 48.141756 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.141978, "Longitude": 11.577134, "Name": "Theatinerkirche", "Number": 9, "Type": "Religious", "Address": "Salvatorplatz 2A, 80333 München", "Hours": "Mo-Su 07:00-20:00", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Ground level at the right entrance,  electric door opener 85 cm high.  Inside electric door opener 85 cm high to the nave.<br><br>With its yellow facade and ornate interior, the Theatinerkirche (Theatine Church) at Odeonsplatz is one of the most beautiful churches in Munich. To say thank you for the birth of Max Emanuel, the long-awaited heir to the throne, in the mid 17th century, Elector Ferdinand Maria and his wife Henriette Adelaide commissioned architects from Italy to build the “most beautiful and precious church.”", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_medium/4/2/3/9/69324-1-ger-DE/theatinerkirche-innen-sonne-foto-sven-kolb-3000.jpg'", "imgsource": "simplyMunich", "Website": "http://www.theatinerkirche.de/", "Phone": "+49 89 2106960", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "2 spaces Salvatorplatz 2, underground parking Am Salvatorplatz" }, "geometry": { "type": "Point", "coordinates": [ 11.577134, 48.141978 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.14236, "Longitude": 11.581422, "Name": "Hofgarten", "Number": 10, "Type": "Garden", "Address": "Hofgartenstraße 1, 80538 München", "Hours": "Open 24 hours", "MustSee": " ", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "Stepless via Odeonsplatz and Galeriestraße,  steep drive-up coming from Marstallplatz. nearest barrier-free WC: Restaurant Koi and Café Luitpold (both are accessible from the front,  right and left).<br><br> The Hofgarten (Royal Garden) at the Residenz palace is an idyllic green park on the edge of Munich’s historic old town. At the centre of the park, you will find a pavilion, popularly known as Diana Temple. The delicate, dodecagonal pavilion, which features eight entrance archways, was created by Heinrich Schön the Elder in 1615.  Right beside it, you can also visit the Munich Residenz, the largest inner-city palace in Germany.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/HOFGARTEN%20OBEN%204343.jpg?h=08b866d1'", "imgsource": "Maximilian Linner / Shutterstock.com", "Website": "https://www.residenz-muenchen.de/deutsch/hofgart/index.htm", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "underground parking Am Salvatorplatz" }, "geometry": { "type": "Point", "coordinates": [ 11.581422, 48.14236 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.144495, "Longitude": 11.583641, "Name": "Englischer Garden", "Number": 11, "Type": "Park", "Address": "Prinzregentenstraße,  80538 München", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The ways in the park are covered with asphalt or gravel and suitable for wheelchairs.  barrier-free WC in the Zum Aumeister, in the Hirschau, at the Chinese Tower, in the Seehaus and in \"Tivoli Pavillon\" (Gyßlingstraße 10, next to Hirschau. WC accessible from left, front 80 cm,  grab handle only left.  Staff opens the door).<br><br>The Monopteros, the Eisbach wave and many beer gardens\n\nToday, the people of Munich love the English Garden: on nice days they enjoy the sun on the meadows, play football or go for a walk. In winter, with good snow conditions and cold temperatures, you can even go cross-country skiing here or skate your laps on the Kleinhesseloher See lake. Or go sledding on the Monopteros hill. The view from this Greek-like temple is worthwhile at any time of year, because you have all the most important sights of Munich city centre at a glance: the Frauenkirche, the Theatinerkirche and the City Hall.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/5/2/5/1/521525-1-ger-DE/englischer-garten-mit-stadtpanorama-2171s-foto-joerg-lutz.jpg'", "imgsource": "Jörg Lutz", "Website": "https://www.schloesser.bayern.de/deutsch/garten/objekte/mu_engl.htm", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "Behind the museum Haus der Kunst and at the beer gardens (see \"WC\" below)" }, "geometry": { "type": "Point", "coordinates": [ 11.583641, 48.144495 ] } },
  { "type": "Feature", "properties": { "Latitude": 48.1434189, "Longitude": 11.5877449, "Name": "Surfer's Site at the Eisbach", "Number": 12, "Type": "Park", "Address": "Prinzregentenstraße opposite number 22 in 80538 Munich", "Hours": "Open 24 hours", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "Description": "The waves on the man-made Eisbach river at the entrance to the Englischer Garten (park) attract surfers and onlookers from around the world. The spot is famous throughout the world for being the largest, best and most consistent city centre location for river surfing.  People have been surfing here for 40 years.  Wheelchair friendly viewing from the bridge. ", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/0/2/7/2/1322720-1-ger-DE/rundgang-muenchen-74a7830-foto-frank-stolle-sm-3000.jpg' alt='Surfer at the Eisbach River'", "imgsource": "Frank Stolle", "Website": "https://www.muenchen.travel/pois/sport-freizeit/eisbachwelle", "Phone": null, "wc": null, "parking": null, "guideDog": null, "parking_text": null, "elevator": null, "guidedTour": null, "elderly": null, "stroller": null, "audioGuide": null, "image2": null }, "geometry": { "type": "Point", "coordinates": [ 11.587745757417512, 48.143418882923648 ] } }
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
const layerList = document.getElementById('menu'); //'menu' is the div element id
const inputs = layerList.getElementsByTagName('input'); //'input', <input> tag specifies an input field where the user can enter data

// All sources and layers are removed when new style is loaded!!
// So we need to add sources and layers each time new style is loaded.
// We will create the functions addSource() and addLayer() to do this each time we load a new style.

function addSource() { 
  // For each new source, we need to create map.addSource()
  map.addSource('englisch_garten', {
    'type': 'geojson',
    'data': {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "MultiLineString",
       	"coordinates": [[[11.58784, 48.14333], [11.58783, 48.14333], [11.58797, 48.14345], [11.58825, 48.14359], [11.58843, 48.14362], [11.58864, 48.14371], [11.58875, 48.14375], [11.589, 48.14385], [11.58914, 48.1439], [11.58929, 48.14395], [11.58936, 48.14398], [11.58954, 48.14404], [11.58994, 48.14418], [11.59022, 48.1443], [11.59057, 48.14447], [11.59073, 48.14457], [11.59096, 48.14467], [11.59117, 48.14481], [11.59124, 48.1449], [11.59131, 48.145], [11.59136, 48.14505], [11.59154, 48.14528], [11.59168, 48.14556], [11.59172, 48.14586], [11.59174, 48.14612], [11.59169, 48.14643], [11.59168, 48.14653], [11.59158, 48.14672], [11.59146, 48.147], [11.59136, 48.14707], [11.59124, 48.14714], [11.59118, 48.14721], [11.59143, 48.14739], [11.59173, 48.14762], [11.59195, 48.14787], [11.59209, 48.14799], [11.59218, 48.14806], [11.59227, 48.14814], [11.59275, 48.14856], [11.59288, 48.14874], [11.59306, 48.14911], [11.59314, 48.1493], [11.59319, 48.14939], [11.59321, 48.14944], [11.59335, 48.14977], [11.59343, 48.15017], [11.59347, 48.15044], [11.59354, 48.15072], [11.59356, 48.15078], [11.59356, 48.1508], [11.59356, 48.15093], [11.59354, 48.15101], [11.59372, 48.15121], [11.59394, 48.15162], [11.59398, 48.15169], [11.59404, 48.15174], [11.59408, 48.1518], [11.59412, 48.15174], [11.5942, 48.15164], [11.59427, 48.15157], [11.59445, 48.15158], [11.59463, 48.15161], [11.59466, 48.15162], [11.59467, 48.15164], [11.59479, 48.15205], [11.59485, 48.15221], [11.5949, 48.15242], [11.59502, 48.15267], [11.59546, 48.153], [11.59554, 48.15318], [11.59547, 48.15337], [11.59541, 48.15352], [11.59547, 48.15372], [11.59569, 48.15398], [11.59598, 48.15422], [11.59599, 48.15423], [11.596, 48.15423], [11.59628, 48.1544], [11.597, 48.15496], [11.59723, 48.15511], [11.59733, 48.15518], [11.59732, 48.1552], [11.59736, 48.15532], [11.59767, 48.15562], [11.59833, 48.15621], [11.59878, 48.15677], [11.59888, 48.15713], [11.59894, 48.15749], [11.59902, 48.15815], [11.59902, 48.15854], [11.59899, 48.15875], [11.59899, 48.15891], [11.59904, 48.15907], [11.59921, 48.15899], [11.59925, 48.15898], [11.59955, 48.15898], [11.59965, 48.159], [11.59973, 48.15903], [11.59991, 48.15916], [11.60003, 48.15928], [11.60006, 48.15934], [11.60026, 48.15959], [11.60015, 48.15968], [11.60026, 48.15969], [11.60032, 48.15966], [11.60026, 48.15969], [11.60056, 48.15974], [11.60091, 48.15985], [11.6011, 48.15994], [11.60133, 48.16008], [11.60153, 48.1602], [11.60162, 48.16029], [11.6019, 48.16023], [11.60214, 48.16018], [11.60236, 48.16018], [11.60244, 48.16019], [11.60254, 48.16023], [11.60271, 48.16036], [11.60331, 48.16088], [11.60368, 48.16115], [11.60396, 48.16137], [11.60407, 48.16145], [11.60513, 48.1623], [11.60516, 48.16233], [11.60618, 48.16319], [11.60717, 48.16393], [11.60705, 48.16431], [11.6068, 48.16472], [11.60658, 48.165], [11.60661, 48.16505], [11.6068, 48.16538], [11.60728, 48.16576], [11.60766, 48.16607], [11.60782, 48.16625], [11.60787, 48.16637], [11.60787, 48.16653], [11.60786, 48.16659], [11.60794, 48.16661], [11.60799, 48.16662], [11.60802, 48.16662], [11.60808, 48.1667], [11.60742, 48.16708], [11.60714, 48.16724], [11.60676, 48.16744], [11.6065, 48.16761], [11.60634, 48.1677], [11.60625, 48.16774], [11.60598, 48.16758], [11.60586, 48.16748], [11.60534, 48.16727], [11.60514, 48.16716], [11.60507, 48.1671], [11.60502, 48.16709], [11.60493, 48.16707], [11.60486, 48.16706], [11.60468, 48.16698], [11.60453, 48.16689], [11.60441, 48.16686], [11.60406, 48.16678], [11.60409, 48.1667], [11.60413, 48.16659], [11.60418, 48.16644], [11.60414, 48.1663], [11.60394, 48.16618], [11.60308, 48.16593], [11.60273, 48.16577], [11.60244, 48.16548], [11.60237, 48.16537], [11.6021, 48.16503], [11.60187, 48.16486], [11.60147, 48.16455], [11.60139, 48.1644], [11.60136, 48.16435], [11.60124, 48.16407], [11.60121, 48.16343], [11.60115, 48.16315], [11.60091, 48.16285], [11.60068, 48.16253], [11.60062, 48.16247], [11.60054, 48.16226], [11.6003, 48.16191], [11.60017, 48.16183], [11.59992, 48.16173], [11.59926, 48.16144], [11.59882, 48.16124], [11.59844, 48.1611], [11.59828, 48.16119], [11.59816, 48.16129], [11.59807, 48.16138], [11.59808, 48.16138], [11.59797, 48.16149], [11.59784, 48.16185], [11.59772, 48.16193], [11.59734, 48.16207], [11.59711, 48.16213], [11.59695, 48.16212], [11.59681, 48.16208], [11.59673, 48.16206], [11.59655, 48.16194], [11.59651, 48.16192], [11.59639, 48.16181], [11.59626, 48.1616], [11.59622, 48.16133], [11.59613, 48.1612], [11.59596, 48.16114], [11.59571, 48.16112], [11.59537, 48.16117], [11.59508, 48.16121], [11.59498, 48.16121], [11.59481, 48.16118], [11.59458, 48.16105], [11.59436, 48.16085], [11.59425, 48.16066], [11.5941, 48.16047], [11.5939, 48.16035], [11.59373, 48.16026], [11.59352, 48.16017], [11.5934, 48.16015], [11.5933, 48.16013], [11.59313, 48.1599], [11.59293, 48.15979], [11.59286, 48.15972], [11.59277, 48.15967], [11.59267, 48.15961], [11.59257, 48.15945], [11.59237, 48.15939], [11.59213, 48.15883], [11.59195, 48.15854], [11.59178, 48.15841], [11.59159, 48.15825], [11.59149, 48.15812], [11.59152, 48.15795], [11.59153, 48.15782], [11.59149, 48.15768], [11.59124, 48.15744], [11.59113, 48.15727], [11.59115, 48.15709], [11.59114, 48.15692], [11.59102, 48.15673], [11.59096, 48.15664], [11.5909, 48.15654], [11.59091, 48.15641], [11.59091, 48.15619], [11.591, 48.15594], [11.59134, 48.15563], [11.59121, 48.15548], [11.59105, 48.15531], [11.59097, 48.15492], [11.59097, 48.15461], [11.59097, 48.15445], [11.59093, 48.15427], [11.5909, 48.15414], [11.59063, 48.15398], [11.59052, 48.15392], [11.59044, 48.15387], [11.59041, 48.15385], [11.59031, 48.15363], [11.59022, 48.15338], [11.59011, 48.15318], [11.59009, 48.15315], [11.59003, 48.1531], [11.58989, 48.15303], [11.58972, 48.15294], [11.58943, 48.1528], [11.58917, 48.15264], [11.58895, 48.1525], [11.58859, 48.15228], [11.58854, 48.15224], [11.58856, 48.15216], [11.58865, 48.15201], [11.58853, 48.15193], [11.58843, 48.15179], [11.58836, 48.15169], [11.58827, 48.15158], [11.58821, 48.15148], [11.58807, 48.15137], [11.5879, 48.15125], [11.58773, 48.15111], [11.58781, 48.15101], [11.58795, 48.15081], [11.58805, 48.15059], [11.58808, 48.15035], [11.58797, 48.15011], [11.58786, 48.14992], [11.58767, 48.14965], [11.58753, 48.14967], [11.58738, 48.14971], [11.5872, 48.14975], [11.58715, 48.14963], [11.58714, 48.14947], [11.58718, 48.14929], [11.58719, 48.14928], [11.58724, 48.14916], [11.58728, 48.14907], [11.58727, 48.14888], [11.58732, 48.14878], [11.58735, 48.14872], [11.58733, 48.14788], [11.58736, 48.14704], [11.5874, 48.14667], [11.58744, 48.14631], [11.58743, 48.14613], [11.58741, 48.14605], [11.5873, 48.14595], [11.58726, 48.14587], [11.58725, 48.14574], [11.58742, 48.14574], [11.58747, 48.14574], [11.58774, 48.14575], [11.58779, 48.14576], [11.58817, 48.14582], [11.58822, 48.14576], [11.5884, 48.14557], [11.58844, 48.14552], [11.58854, 48.14541], [11.58859, 48.14533], [11.58857, 48.14513], [11.58851, 48.14498], [11.58838, 48.14471], [11.58838, 48.14456], [11.58838, 48.14451], [11.58839, 48.14427], [11.58834, 48.14392], [11.58833, 48.14375], [11.58825, 48.14359], [11.58797, 48.14345], [11.58783, 48.14333], [11.58784, 48.14333]]],
			},
			"properties": {
				"name": "Englisch Garten Trail",
			}
		}
	]
}
});
  

  map.addSource('Munich-Intro-Route',{
      type: 'geojson',
      data:'/data/Munich-Intro-Route.geojson'
  
      });


  //Add source before this//          
  }

function addLayer() {
// For each source we added, we need to use map.addLayer() to add it to the map.
// map.setLayerZoomRange is used to set the layer zoom range
//   map.addLayer({
//     'id': 'englisch_garten',
//     'type': 'line',
//     'source': 'englisch_garten',
//     'metadata': 'Englisch Garten',
//     'layer.minZoom': 12,
//     'layout': {
//       'line-join': 'round',
//       'line-cap': 'round'
//     },
//     'paint': {
//     'line-color': '#39753c',
//     'line-width': 3.5,
//     'line-opacity': 0.6,
//     'line-dasharray': [1, 3]
//     },
//     'metadata': {
//       'displayName': 'Englisch Garten Route',
//       'showInLegend': true
// }
//     });

    // map.addLayer({

    //     });
    // map.setLayerZoomRange('', 12, 22);

    
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
        'line-opacity': 0.8,
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
        addLayer();


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
            .

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
          link.innerHTML = `${attraction.properties.Number}&middot ${attraction.properties.Name}&nbsp;&nbsp;${attraction.properties.MustSee}`;
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
          <li><i><b><font color="#9f9f9f"><font size="1">${attraction.properties.Type}</font color></font size></b></i></li>
          <li>${attraction.properties.Address}</li>
          <li><i>${attraction.properties.Hours}</i>&nbsp;
          <a href=${attraction.properties.Website}><i class="fa-solid fa-link"></i></a></li></ul>`
      
          if (attraction.properties.parking){
            details.innerHTML += `<ul><li>Disabled Parking:&nbsp;${attraction.properties.parking_text}</li></ul>`
          };

          details.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`

          if (attraction.properties.wheelchair !== null) {
            details.innerHTML += `${attraction.properties.wheelchair}&nbsp;&nbsp;`
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
          zoom: 16
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
            <img id="myImg" ${currentFeature.properties.image} style="width:100%;max-width:350px">
           <center><i>Image Source:&nbsp;${currentFeature.properties.imgsource}</i></center><br>
            <p>${currentFeature.properties.Description}</p>`
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



