const home = [11.575853, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/pheebely/cldbvauu7004w01mfrzvptq6r',
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
  "name": "Top-Religious-Fields",
  "features": [
  { "type": "Feature", "properties": { "Number": 1, "Name": "Frauenkirche", "Latitude": 48.138554, "Longtitude": 11.572816, "Type": "Religious", "Address": "Frauenplatz 1, 80331 München", "Hours": "Mo-Su 07:30-20:30", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": "S1-S8 (coming from the central station exit left for the elevator!), U3, U6, Bus 132 Marienplatz, S1-S8 (exit left to the elevator!), U4, U5, Tram 16, 17, 18, 19, 20, 21, 27, 28, N17, N19, N20, N27, N40, N41, N45 Karlsplatz.", "Access": "Ramp with an incline of 6 % at the northern porch (left side of the main entrace)", "Description": "The Cathedral Church of Our Lady (Frauenkirche) is Munich's most famous church and its two towers are unmistakable landmarks of the city. <br>Ramp with an incline of 6 % at the northern porch (left side of the main entrace)", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/201203_Frauenkirche_Panorma_Shutterstock_3061137.jpg?h=b78320da'", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/dom_rampe_steinklein.jpg'", "imgsource": "Shutterstock,  simplyMunich", "imgsource2": null, "Website": "https://www.muenchner-dom.de/home/", "Phone": "+49 89 2900820", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3 spaces Ettstraße 2, 7 spaces distributed in Maxburgstraße", "guideDog": null, "elderly": null, "stroller": null, "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.572816, 48.138554 ] } },
  { "type": "Feature", "properties": { "Number": 2, "Name": "St. Michael Kirche", "Latitude": 48.138808, "Longtitude": 11.570635, "Type": "Religious", "Address": "Maxburgstraße 1, 80333 München", "Hours": "Mo-Su 07:30-19:00", "MustSee": " ", "MVV": "S1-S8 (coming from the central station exit left for the elevator), U3, U6, Bus 132 Marienplatz, S1-S8 (exit left to the elevator!), U4, U5, Tram 16, 18, 19, 20, 21, 27, 28, N17, N19, N20, N27, N40, N41, N45 Karlsplatz.", "Access": "Ramp with an incline of 6 % at the right side of the main portal,  electric door opener; only stairs to the crypt.", "Description": "The St. Michael Church in Munich is the largest Renaissance-style religious building north of the Alps. It is managed by the Jesuit order and was built by the Duke of Bavaria, William IV, as a center for the Counter Reformation in response to Martin Luther’s protestant reforms of Christendom.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/st-michael-01.jpg?h=84071268'", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/st._michael_rampe.klein.jpg'", "imgsource": "simplyMunich, Katy Spichal", "imgsource2": "Katy Spichal", "Website": "https://www.st-michael-muenchen.de/index.php?id=23", "Phone": "+49 892317060", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3 spaces Ettstraße 2, 7 spaces distributed in Maxburgstraße", "guideDog": null, "elderly": null, "stroller": null, "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.570635, 48.138808 ] } },
  { "type": "Feature", "properties": { "Number": 3, "Name": "Damenstiftkirche St. Anna", "Latitude": 48.137418, "Longtitude": 11.569039, "Type": "Religious", "Address": "Damenstiftstraße 1, 80331 München", "Hours": "Opening Hours Unavailable", "MustSee": " ", "MVV": null, "Access": "Single low step at main entrance.", "Description": "The Women’s Collegiate Church of St. Anna is located in the historic Old Town of Munich. The collegiate was once a religious refuge for ladies from aristocratic families. Today, the St. Anna Damenstift serves as a parish church of Munich’s St. Peter parish. The convent has been converted into a high school. Noteworthy treasures inside the church are the altarpiece of the Virgin and Child by Joseph Ruffini and the frescoes in the bay, on the dome ceiling and the choir room by Cosmas Damian Asam.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/MUC_DamenstiftskircheStAnnaB.jpg/631px-MUC_DamenstiftskircheStAnnaB.jpg'", "image2": null, "imgsource": "Wikipedia.org", "imgsource2": null, "Website": "https://petrusbruderschaft.de/pages/wo-wir-sind/deutschland/niederlassungen/muenchen/home.php", "Phone": "+49 089 23076770", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": null, "parking_text": null, "guideDog": null, "elderly": null, "stroller": null, "guidedTour": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.569039, 48.137418 ] } },
  { "type": "Feature", "properties": { "Number": 4, "Name": "Asamkirche", "Latitude": 48.135089, "Longtitude": 11.569694, "Type": "Religious", "Address": "Sendlinger Str. 32, 80331 München", "Hours": "Su-Th 09:00-19:00 <br> Fr 13-18:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": null, "Access": "Wheelchair users can only view facade from the outside.  ", "Description": "A hidden gem church in the middle of Munich's pedestrian zone. The St. John Nepomuk Church was designed by the Asam brothers as a magnificent private church in the style of the Bavarian late Baroque and is one of their masterpieces.", "image": "src='/images/asamkirche.jpg' alt='Asamkirche baroque architecture from the outside'", "image2": null, "imgsource": "Wikipedia.org", "imgsource2": null, "Website": "https://alterpeter.de/nebenkirchen/#asamkirche", "Phone": "+49 89 236879 89", "wheelchair": null, "wc": null, "elevator": null, "parking": null, "parking_text": "Disabled parking spaces available free of charge:\nSt.-Jacobs-Platz 12 / Rosental 7 / Hackenstr. 1\nCar parks (not free of charge): Parkhaus Oberanger", "guideDog": null, "elderly": "<i class=\"fa-solid fa-person-cane\"></i>", "stroller": "<i class=\"fa-solid fa-baby-carriage\"></i>", "guidedTour": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.569694, 48.135089 ] } },
  { "type": "Feature", "properties": { "Number": 5, "Name": "Peterskirche", "Latitude": 48.136405, "Longtitude": 11.576584, "Type": "Religious", "Address": "Rindermarkt 1, 80331 München", "Hours": "Mo-Su 07:30-19:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": "S1-S8 (coming from the central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Stepless. to Viktualienmarkt precipitous!", "Description": "St. Peter's Church is a Roman Catholic parish church in the inner city of Munich, southern Germany. Its 91-metre tower is commonly known as \"Alter Peter\"‚ÄîOld Peter‚Äîand is emblematic of Munich. St Peter's is the oldest recorded parish church in Munich and presumably the originating point for the whole city.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/6/7/4/2/2662476-1-ger-DE/Alter%20Peter%20mit%20Sonnenstern%2C%20©%20München%20Tourismus%2C%20Joerg%20Lutz.jpg'", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/st._peter.klein.jpg'", "imgsource": "Jörg Lutz,  simplyMunich", "imgsource2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/st._peter.klein.jpg'", "Website": "https://alterpeter.de/pfarrkirche-st-peter/", "Phone": "+49 89 210237 760", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "2 spaces Rindermarkt 14, 3 spaces Rindermarkt 5", "guideDog": null, "elderly": null, "stroller": null, "guidedTour": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.576584, 48.136405 ] } },
  { "type": "Feature", "properties": { "Number": 6, "Name": "Allerheiligen-Hofkirche", "Latitude": 48.1404, "Longtitude": 11.580236, "Type": "Religious", "Address": "Residenzstr. 1, 80333 München", "Hours": "Mo-Su 09:00-18:00", "MustSee": " ", "MVV": "S1-S8 (from the main station to get off to the left!), U3, U6, Bus 132 Marienplatz, U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz, Tram 19, N19 Nationaltheater.", "Access": "From the cabinet garden, electric door opener 85 high, lift. Entrance door Electric door opener. <br> In the pharmacy yard, 3 of which are from 6 p.m. to 9 p.m.", "Description": "The All Saints' Court Church can only be visited as part of a visit to the residence, or as part of an event.<br><br>\nAfter many years of renovation, the All Saints' Court Church in the Munich Residence now serves as a hall for events. During World War II, the church was severely damaged, reconstruction was delayed for a long time. Even an demolition of the ruin was in the room.\n\nIn 2000, it was finally committed to a careful renovation of the church. In 2006, it received the prize for cityscape maintenance of the city of Munich.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/shutterstock_1696836058.png?h=707772c7'", "image2": null, "imgsource": "Shutterstock", "imgsource2": null, "Website": "https://www.residenz-muenchen.de/deutsch/ahkirche/index.htm", "Phone": "+49 89290671", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": null, "parking_text": null, "guideDog": null, "elderly": null, "stroller": null, "guidedTour": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.580236, 48.1404 ] } },
  { "type": "Feature", "properties": { "Number": 7, "Name": "Theatinerkirche", "Latitude": 48.141978, "Longtitude": 11.577134, "Type": "Religious", "Address": "Salvatorplatz 2A, 80333 München", "Hours": "Mo-Su 07:00-20:00", "MustSee": " ", "MVV": "U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz", "Access": "Ground level at the right entrance,  electric door opener 85 cm high.  Inside electric door opener 85 cm high to the nave.", "Description": "With its yellow facade and ornate interior, the Theatinerkirche (Theatine Church) at Odeonsplatz is one of the most beautiful churches in Munich. To say thank you for the birth of Max Emanuel, the long-awaited heir to the throne, in the mid 17th century, Elector Ferdinand Maria and his wife Henriette Adelaide commissioned architects from Italy to build the ‚Äúmost beautiful and precious church.‚Äù", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_medium/4/2/3/9/69324-1-ger-DE/theatinerkirche-innen-sonne-foto-sven-kolb-3000.jpg'", "image2": "src='https://www.muenchen-tourismus-barrierefrei.de/images/theatinerkirche-eingang-rechts.klein.jpg'", "imgsource": "simplyMunich", "imgsource2": null, "Website": "http://www.theatinerkirche.de/", "Phone": "+49 89 2106960", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "elevator": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": null, "guideDog": null, "elderly": null, "stroller": null, "guidedTour": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.577134, 48.141978 ] } }
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
  
  map.addSource('Top-Religious-Route', { 
      'type': 'geojson',
      'data': '/data/Top-Religious-Route.geojson'
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
        id: 'Top-Religious-Route',
        type: 'line',
        source: 'Top-Religious-Route',
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
    map.setLayerZoomRange('Top-Religious-Route', 12, 22);



 //Add layer before this// 
}


// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function(){
  const layers = map.getStyle().layers;


      map.addSource('top-religious', {
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

          if (attraction.properties.MustSee){
            link.innerHTML += `${attraction.properties.MustSee}`
          };


          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.className = 'details';
          details.innerHTML = `
          <ul>
          <li><i><b><font color="#9f9f9f"><font size="normal">${attraction.properties.Type}</font color></font size></b></i></li>
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
            <center><b>Click on the map or scroll back up to close!</center></b></i>
            </font size>
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



