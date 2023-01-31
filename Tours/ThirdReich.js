const home = [11.575853, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/pheebely/cldbw81tv009e01lithxtp1hj',
center: home,
zoom: 14.5,
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
  "name": "Third-Reich",
  "features": [
  { "type": "Feature", "properties": { "Number": 1, "Name": "Fuhrerbau (Führer's Building)", "Latitude": 48.146064, "Longitude": 11.567145, "Type": "Landmark", "Address": "Arcisstr. 12, 80333 München", "Hours": " ", "MustSee": null, "MVV": "U2, U8, Bus 58, 68, 100, Königsplatz", "Access": "Wheelchair access by ramp from front entrance", "Description": "The former \"Führerbau\" in Arcisstraße, today a music college. The Führerbau - translated as \"the Führer's building\" - was a Nazi party edifice located in Königsplatz and was built from 1933 to 1937 to the design of architect Paul Ludwig Troost. Today, the building houses the Hochschule für Musik und Theater München (University of Music and Performing Arts Munich). Its congress hall now serves as a concert venue.\n\nDuring the Nazi times, it served as a representative building for Adolf Hitler. The Führerbau has historical significance for being the place where Neville Chamberlain and Adolf Hitler signed the Munich treaty in September 1938.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Muearcisstr12d13052016c90.jpg/640px-Muearcisstr12d13052016c90.jpg'", "image2": "src='https://assets.deutschlandfunk.de/FILE_e4a258a2fe8966334c32afa2de16acd6/1920x1080.jpg?t=1597636909584'", "imgsource": "Wikipedia, dpa/ Robert B. Fishman", "Website": "https://en.wikipedia.org/wiki/Führerbau", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.567145, 48.146064 ] } },
  { "type": "Feature", "properties": { "Number": 2, "Name": "Feldherrnhalle", "Latitude": 48.141756, "Longitude": 11.577346, "Type": "Monument", "Address": "Residenzstraße 1, 80333 München", "Hours": "Open 24 hours", "MustSee": null, "MVV": null, "Access": "Pedestrian zone", "Description": "The Feldherrnhalle is The Feldherrnhalle or Field Marshall’s Hall is a large loggia built to commemorate Bavarian military leaders and soldiers who fell during the Franco-Prussian War. It is located at the southern end of Odeonsplatz, between Theatinerstraße and Residenzstraße. The monumental hall was built between 1841 and 1844 by the famous architect Friedrich von Gärtner, commissioned by King Ludwig I.\n\nThis stately complex in the heart of Munich played a key role in the Nazi’s seizure of power.", "image": "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/feldherrnhalle-sommerabend.jpg?h=19f14c2c' alt='Feldhernnhalle monument at night'", "image2": null, "imgsource": "Michael Hofmann", "Website": "https://www.muenchen.de/sehenswuerdigkeiten/bauwerke-und-denkmaeler/feldherrnhalle", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.577346, 48.141756 ] } },
  { "type": "Feature", "properties": { "Number": 3, "Name": "Hofbräuhaus", "Latitude": 48.137665, "Longitude": 11.579815, "Type": "Food/Landmark", "Address": "Platzl 9, 80331 München", "Hours": "Mo-Su 09:00-24:00", "MustSee": "<i class=\"fa-solid fa-fire\"></i>", "MVV": "By public transport: The tram stop Nationaltheater of line 19 is not far away.\nBy car: better not.", "Access": "Access through the main entrance is problem-free. You have to go through a hinged door first, stop on the right, which strikes inwards (180cm clear width) and then through a very large (400x400cm) porch and another door, just like the first. The guest rooms on the first floor can be continuously reached by kitchen lift (door 130 cm, cabin 130x105cm). There is another lift, but to use it, you have to overcome a 7cm level.", "Description": "The Hofbräuhaus is probably the best-known “watering hole” in Munich. Dating all the way back to 1589, this beer hall was founded by the Duke of Bavaria, Wilhelm V, and originally, surprisingly enough, was not open to the public. Luckily for today's tourists and locals, though, in 1828 it finally opened up to the masses. Today, this hospitable spot, thick with traditional atmosphere and friendly vibes, is where you can come to enjoy typical Bavarian food to your heart's content, listen to the Oompah band play loudly on stage, and gulp down the rich Hofbräuhaus beer in large, one-liter steins, which the Germans call a Mass.<br><br>Renowned for its beer, Hofbräuhaus also made mark in history on 24 February 1920, when Adolf Hitler held here one of his first propaganda gatherings.", "image": "src='https://www.munich.travel/var/ger_muc/storage/images/_aliases/stage_large/9/9/5/5/265599-1-ger-DE/film-hofbrauhaus-02-foto-redline-enterprises-sm-3000.jpg'", "image2": null, "imgsource": "simplyMunich", "Website": "https://www.hofbraeuhaus.de/de/willkommen.html", "Phone": "+49 89 290136 129", "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": "<i class=\"fa-solid fa-restroom\"></i>", "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "In Maximilianstraße at the Nationaltheater,  north side, height stage entrance, 300 m away, five wheelchair parking spaces are designated.", "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": "<i class=\"fa-solid fa-dog\"></i>", "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.579815, 48.137665 ] } },
  { "type": "Feature", "properties": { "Number": 4, "Name": "Altes Rathaus", "Latitude": 48.136663, "Longitude": 11.576848, "Type": "Landmark", "Address": "Marienplatz 15, 80331 München", "Hours": "Mo-Su 10:00-17:30", "MustSee": null, "MVV": "S1-S8 (from the main station to get off to the lift left!), U3, U6, bus 132 Marienplatz", "Access": "Wheelchair users accessible by elevator (access to the 1st floor through the service area).", "Description": "Once the seat of the Munich Municipality,  prior to the construction of Neues Rathaus in 1874,  Altes Rathaus (the Old Town Hall) stands on the eastern side of Marienplatz.  It was left untouched, unlike many other buildings that were demolished to make way for the building. Due to its plain facade,  many people believe that the Alte Rathaus (Old Town Hall) is newer than the ornately decorated Neue Rathaus (New Town Hall),  when in fact it is over 400 years older.<br><br>This stately complex in the heart of Munich played a key role in the Nazi’s seizure of power. It is here that Joseph Goebbels gave his infamous speech that inspired Kristallnacht, or “the night of broken glass,” on November 9, 1938, a nationwide pogrom that led to the destruction of numerous Jewish businesses and arrest of thousands of Jewish citizens. Kristallnacht is generally considered to be the start of the “Ultimate Solution of the Jewish Question”, i.e. the Holocaust.", "image": "src='https://stadt.muenchen.de/.imaging/mte/lhm/image-aspect-ratio-3-2-1216w/dam/Home/Stadtinfos/Presse-Service/Presse_Fotos/Rathaus/altes_rathaus_02/jcr:content/altes_rathaus_02.jpg'", "image2": null, "imgsource": "muenchen.de", "Website": "https://www.marienplatz-muenchen.de/altes-rathaus/", "Phone": null, "wheelchair": null, "wc": null, "parking": "<i class=\"fa-solid fa-square-parking\"></i>", "parking_text": "3x barrier-free parking possible", "elevator": "<i class=\"fa-solid fa-elevator\"></i>", "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.576848, 48.136663 ] } },
  { "type": "Feature", "properties": { "Number": 5, "Name": "Sterneckerbräu", "Latitude": 48.135608, "Longitude": 11.58066, "Type": "Landmark", "Address": "Tal 38A, 80331 München", "Hours": " ", "MustSee": null, "MVV": null, "Access": "Wide pedestrian path", "Description": "The Sterneckerbräu was a brewery in Munich. The associated inn served as a meeting place for the first branch of the German Workers' Party (DAP) and, similarly to the Bürgerbräukeller, was a place of pilgrimage for the Nazi movement. The DAP members met once a week in the restaurant on the first floor of the building. On 12 September 1919, Adolf Hitler attended a DAP gathering on behalf of the intelligence command of the army, which took place in a meeting room of the Sterneckerbräu, and was invited to join the party. He accepted the invitation and, on that date, became the DAP's 55th member.\n\nThe building survived World War II. In 1957, the restaurant was closed and the first floor was converted into a store. The building is now used as a residential and commercial property, and is a registered monument on the Bavarian monument list.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sterneckerbräu2014.jpg/640px-Sterneckerbräu2014.jpg'", "image2": null, "imgsource": "Wikimedia", "Website": "https://en.wikipedia.org/wiki/Sterneckerbräu", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.58066, 48.135608 ] } },
  { "type": "Feature", "properties": { "Number": 6, "Name": "Hitler's Early Residence in Munich", "Latitude": 48.136501, "Longitude": 11.587593, "Type": "Landmark", "Address": "Thierschstraße 41, 80538 München", "Hours": " ", "MustSee": null, "MVV": null, "Access": "Wide pedestrian path", "Description": "After being discharged from the German Army in March 1920, Hitler returned to Munich and went to work full-time for the National Socialist German Workers' Party (Nazi Party), which was headquartered in the city. He rented a small bedroom at Thierschstrasse 41, from 1920 to 1929. Later, he rented a second room to use as an office. The building still stands; Hitler's former room is used for storage.", "image": "src='https://upload.wikimedia.org/wikipedia/commons/4/46/Thierschstr._41_Muenchen-1.jpg'", "image2": null, "imgsource": "Wikimedia", "Website": "https://en.wikipedia.org/wiki/Adolf_Hitler%27s_Munich_apartment", "Phone": null, "wheelchair": "<i class=\"fa-brands fa-accessible-icon\"></i>", "wc": null, "parking": null, "parking_text": null, "elevator": null, "elderly": null, "stroller": null, "guidedTour": null, "guideDog": null, "audioGuide": null }, "geometry": { "type": "Point", "coordinates": [ 11.587593, 48.136501 ] } }
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
  
  map.addSource('Third-Reich-Route', { 
      'type': 'geojson',
      'data': '../data/Third-Reich-Route.geojson'
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
        id: 'Third-Reich-Route',
        type: 'line',
        source: 'Third-Reich-Route',
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
    map.setLayerZoomRange('Third-Reich-Route', 12, 22);



 //Add layer before this// 
}


// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function(){
  const layers = map.getStyle().layers;


      map.addSource('third-reich', {
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
//         addLayer();


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
                createPopUp(feature);

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



