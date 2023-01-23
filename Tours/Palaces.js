const home = [11.578, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
center: home,
zoom: 14.5,
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
  "name": "Palaces",
  "features": [
  { "type": "Feature", "properties": { "Number": 1, "Name": "Alter Hof", "Latitude": 48.138462, "Longitude": 11.578274, "Type": "Palace/Landmark", "Address": "Alter Hof 1, 80331 München", "Hours": "Mo-Sa 10:00-18:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": null, "Access": "Cobblestone", "Description": "The Alte Hof is located in the middle of Munich's old town. It belongs to the first imperial castle of the Wittelsbacher in Munich and has great significance for the history of the city. One of the most exciting legends about Munich revolves around the monkey tower.", "image": "src'https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/07-alter-hof.jpg?h=08b866d1'", "image2": null, "imgsource": "Katy Spichal", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/alter-hof", "Phone": "+49 89 21014050", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.578274, 48.138462 ] } },
  { "type": "Feature", "properties": { "Number": 2, "Name": "Residenz München", "Latitude": 48.140292, "Longitude": 11.578246, "Type": "Palace/Landmark", "Address": "Residenzstraße 1, 80333 München", "Hours": "Garden: Open 24 Hours<br>Museum: Mo-Su 10:00-17:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": "Tram 19, 21, N19 Nationaltheater (exit onto the street, therefore not suitable with a rollator or walking aid!), U3, U4, U5, U6, Bus 100, 153, N40, N41, N45 Odeonsplatz, S1-S8 (coming from the central station exit left to access the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Users of wheelchairs need assistance! Group guided tours for persons with walking disabilities and sight impaired on special arrangement with the chateau administration. The king's building is accessible from Max-Joseph-Platz, you need assistance of the staff for the elevator. Cuvillies-Theater: at ground level via Brunnenhof (cobblestone pavement!), bell 85 cm high, elevator to the first balcony.", "Description": "The Residenz Royal Palace (or Munich Residenz) is the former seat of the Bavarian Government and the residence of dukes, electors and kings from the Wittelsbach family, rulers of Bavaria, who lived here between 1508 and 1918. Today, the palace houses a museum and boasts some of the finest room decorations in Europe.", "image": "src='https://www.residenz-muenchen.de/bilder/residenz/slider/079a_fassade_m-j-platz500.jpg?timestamp=1673217684277'", "image2": null, "imgsource": "Residenz München", "Website": "https://www.residenz-muenchen.de/englisch/tourist/index.htm", "Phone": "+49 89 29067-1", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "5 spaces in Maximilianstraße 8,<br>2 spaces at Max-Joseph-Platz 2", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "elderly": null, "stroller": null, "guidedTour": "<i class=\"fa-solid fa-flag\"></i>", "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.578246, 48.140292 ] } },
  { "type": "Feature", "properties": { "Number": 3, "Name": "Palais Porcia", "Latitude": 48.14072, "Longitude": 11.574469, "Type": "Palace", "Address": "Kardinal-Faulhaber-Straße 14, 80333 München", "Hours": "Available to view 24 Hours", "MustSee": null, "MVV": "S1-S8 (coming from central station exit left to the elevator!), U3, U6, Bus 132 Marienplatz", "Access": "Pedestrian zone, cobblestone", "Description": "Palais Porcia is a large mansion located near the Residenz Royal Palace in Munich, and is the city’s oldest surviving Baroque-style building. From 1932, the Palais Porcia has housed the headquarters of a prominent Bavarian-based German bank, the Bayerische Vereinsbank. The building was severely damaged by the World War II bombings, but was carefully restored after the war, between 1950 and 1952.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/5/5e/M%C3%BCnchen-Altstadt_Palais_Porcia_740.jpg'", "image2": null, "imgsource": "GFreihalter via Wikimedia", "Website": "https://en.wikipedia.org/wiki/Palais_Porcia", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.574469, 48.14072 ] } },
  { "type": "Feature", "properties": { "Number": 4, "Name": "Palais Holnstein", "Latitude": 48.141159, "Longitude": 11.574856, "Type": "Palace", "Address": "Salvatorstraße, 80333 München", "Hours": "Available to view 24 Hours", "MustSee": null, "MVV": "U3, U4, U5, U6 at Odeonsplatz, Tram 19, 21 at Marienplatz (Theatinerstrasse)", "Access": "Pedestrian zone, cobblestone", "Description": "The Palais Holnstein is a large historic mansion commissioned by the Elector Charles Albert in 1733. It is regarded as the finest Rococo-style building in Munich.<br><br>Visitors are not allowed to view the interiors because of the building’s function as the Archbishop’s residence, but the magnificent Rococo façade is available for all to see.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Muekardifaulhaberstr7062018c99.jpg/640px-Muekardifaulhaberstr7062018c99.jpg'", "image2": null, "imgsource": "Wikimedia", "Website": "https://en.wikipedia.org/wiki/Holnstein_Palace", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.574856, 48.141159 ] } },
  { "type": "Feature", "properties": { "Number": 5, "Name": "Palais Preysing", "Latitude": 48.141602, "Longitude": 11.577618, "Type": "Palace/Landmark", "Address": "Residenzstraße 27, 80333 München", "Hours": "Available to view 24 Hours", "MustSee": null, "MVV": "U3, U4, U5, U6 at Odeonsplatz, Tram 19, 21 at Marienplatz (Theatinerstrasse)", "Access": "Pedestrian zone, cobblestone", "Description": "The Palais Preysing was Munich’s first Rococo-style palace. It served as the residence of the Counts of Preysing and is located opposite the Residenz Royal Palace. A notable feature is a magnificent staircase flanked by female statues. Visitors are allowed to view the staircase.<br><br>The little alley behind the palace, called the Viscardigasse, which connects Residezplatz with Theatinerplatz, is better known to the locals as Drueckebergergasse. At the time, Hitler ordered that anyone who passes the Feldherrnhalle beer hall near the Preysing Place, should give the Nazi salute in honor of the Nazi sympathizers who were killed at the spot during a skirmish with the Bavarian Police, known as the Beer House Putsch. As a sign of resistance, the locals used the Viscardigasse to avoid saluting. Drueckeberger, is a slang word in German for those who do not perform their duty.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/6/6e/Mueresidenzstr2725052017c90.jpg'", "image2": null, "imgsource": "<a href=\"https://commons.wikimedia.org/wiki/File:Mueresidenzstr2725052017c90.jpg\">Fentriss</a>, <a href=\"https://creativecommons.org/licenses/by-sa/4.0\">CC BY-SA 4.0</a>, via Wikimedia Commons", "Website": null, "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.577618, 48.141602 ] } },
  { "type": "Feature", "properties": { "Number": 6, "Name": "Prinz Carl Palais", "Latitude": 48.143988, "Longitude": 11.583382, "Type": "Palace/Landmark", "Address": "Königinstraße 1, 80539 München", "Hours": "Available to view 24 Hours", "MustSee": null, "MVV": "U3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz, Bus 100 Königinstraße", "Access": "Easier access through Hofgarten from Galariestrasse, watch for slight slope on the path and the end of Hofgarten and after crossing Galariestrasse.", "Description": "The Prinz Carl Palais is a Neo-Classical style building located in a park north of the Hofgarten in Munich. It is named after one of its owners, Prince Carl, the brother of King Ludwig I, who lived here between 1825 and 1875. Today, it serves as a venue for official receptions by the Bavarian State Governments.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Prinz-Carl-Palais_3550.JPG/640px-Prinz-Carl-Palais_3550.JPG'", "image2": null, "imgsource": "By &lt;a href=&quot;//commons.wikimedia.org/wiki/User:J._Patrick_Fischer&quot; title=&quot;User:J. Patrick Fischer&quot;&gt;J. Patrick Fischer&lt;/a&gt; - &lt;span class=&quot;int-own-work&quot; lang=&quot;en&quot;&gt;Own work&lt;/span&gt;, <a href=\"https://creativecommons.org/licenses/by-sa/3.0/de/deed.en\" title=\"Creative Commons Attribution-Share Alike 3.0 de\">CC BY-SA 3.0 de</a>, <a href=\"https://commons.wikimedia.org/w/index.php?curid=20347714\">Link</a>", "Website": "https://en.wikipedia.org/wiki/Prinz-Carl-Palais", "Phone": null, "wheelchair": null, "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": "<i class=\"fa-solid fa-person-cane\"></i>", "stroller": "<i class=\"fa-solid fa-baby-carriage\"></i>", "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.583382, 48.143988 ] } }
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

  map.addSource('Palaces-Route',{
      type: 'geojson',
      data:'/data/Palaces-Route.geojson'
  
      });


  //Add source before this//          
  }

function addLayer() {
// For each source we added, we need to use map.addLayer() to add it to the map.
// map.setLayerZoomRange is used to set the layer zoom range

    
    map.addLayer({
        id: 'Palaces-Route',
        type: 'line',
        source: 'Palaces-Route',
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
    map.setLayerZoomRange('Palaces-Route', 12, 22);



 //Add layer before this// 
}

// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function(){
  const layers = map.getStyle().layers;


      map.addSource('Palaces', {
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
          link.innerHTML = `${attraction.properties.Number}&period; ${attraction.properties.Name}&nbsp;&nbsp;`;

          if (attraction.properties.MustSee){
            link.innerHTML += `${attraction.properties.MustSee}`
          };

          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.className = 'details';
          details.innerHTML = `
          <ul>
          <li><i><b><font color="#9f9f9f"><font size="1">${attraction.properties.Type}</font color></font size></b></i></li>
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



