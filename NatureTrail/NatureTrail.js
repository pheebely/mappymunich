const home = [11.575853, 48.137437] //coordinates for the default "home" view

	mapboxgl.accessToken = 'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
center: home,
zoom: 11,
minZoom: 4,
maxZoom: 17,
pitch: 40 // pitch in degrees
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
    zoom: 11,
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

// Add Popup on Click to Layer 'old-town-points'
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['old-town-points'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  // Code from the next step will go here.
  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, 15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
    `<h3>${feature.properties.AttractionName}</h3><p>${feature.properties.Type}</p>`
  )
  .addTo(map);
});

// Add Popup on Click to Layer 'munich-intro-tour-points'
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features1 = map.queryRenderedFeatures(event.point, {
    layers: ['munich-intro-tour-points'] // replace with your layer name
  });
  if (!features1.length) {
    return;
  }
  const feature1 = features1[0];

  // Code from the next step will go here.
  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup1 = new mapboxgl.Popup({ offset: [0, 15] })
  .setLngLat(feature1.geometry.coordinates)
  .setHTML(
    `<h3>${feature1.properties.Name}</h3>`
  )
  .addTo(map);
});

// Change thickness of line when hover
// map.on("mouseenter", "old-town-route", (e) => {
//   map.setPaintProperty("old-town-route", "line-width", 8);
//   map.getCanvas().style.cursor = 'pointer';
// });

// map.on("mouseleave", "old-town-route", (e) => {
//   map.setPaintProperty("old-town-route", "line-width", 4);
//   map.getCanvas().style.cursor = '';
// });

// map.on("mouseenter", "walking-routes", (e) => {
//   map.setPaintProperty("walking-routes", "line-width", 8);
//   map.getCanvas().style.cursor = 'pointer';
// });

// map.on("mouseleave", "walking-routes", (e) => {
//   map.setPaintProperty("walking-routes", "line-width", 4);
//   map.getCanvas().style.cursor = '';
// });

// // Change the cursor to a pointer when the mouse is over the places layer.
// map.on('mouseenter', 'old-town-points', () => {
// map.getCanvas().style.cursor = 'pointer';
// });
 
// // Change it back to a pointer when it leaves.
// map.on('mouseleave', 'old-town-points', () => {
// map.getCanvas().style.cursor = '';
// });

// // Change the cursor to a pointer when the mouse is over the places layer.
// map.on('mouseenter', 'munich-intro-tour-points', () => {
// map.getCanvas().style.cursor = 'pointer';
// });
 
// // Change it back to a pointer when it leaves.
// map.on('mouseleave', 'munich-intro-tour-points', () => {
// map.getCanvas().style.cursor = '';
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
  
    
    map.addSource('old-town-points', {
    'type': 'geojson',
    'data': {
      "type": "FeatureCollection",
      "features": [
      { "type": "Feature", "properties": { "Number": 1, "AttractionName": "Marienplatz", "Type": "Landmark", "Latitude": 48.13727, "Longitude": 11.575993 }, "geometry": { "type": "Point", "coordinates": [ 11.575993, 48.13727 ] } },
    { "type": "Feature", "properties": { "Number": 2, "AttractionName": "Neus Rathaus", "Type": "Landmark", "Latitude": 48.137348, "Longitude": 11.576202 }, "geometry": { "type": "Point", "coordinates": [ 11.576202, 48.137348 ] } },
    { "type": "Feature", "properties": { "Number": 3, "AttractionName": "Altes Rathaus", "Type": "Landmark", "Latitude": 48.136663, "Longitude": 11.576848 }, "geometry": { "type": "Point", "coordinates": [ 11.576848, 48.136663 ] } },
    { "type": "Feature", "properties": { "Number": 4, "AttractionName": "Peterskirche", "Type": "Religious", "Latitude": 48.136503, "Longitude": 11.576054 }, "geometry": { "type": "Point", "coordinates": [ 11.576054, 48.136503 ] } },
    { "type": "Feature", "properties": { "Number": 5, "AttractionName": "Viktualienmarkt", "Type": "Shopping", "Latitude": 48.135146, "Longitude": 11.576256 }, "geometry": { "type": "Point", "coordinates": [ 11.576256, 48.135146 ] } },
    { "type": "Feature", "properties": { "Number": 6, "AttractionName": "Munchner Stadtmuseum", "Type": "Museum", "Latitude": 48.135455, "Longitude": 11.572886 }, "geometry": { "type": "Point", "coordinates": [ 11.572886, 48.135455 ] } },
    { "type": "Feature", "properties": { "Number": 7, "AttractionName": "Asamkirche", "Type": "Religious", "Latitude": 48.135184, "Longitude": 11.569654 }, "geometry": { "type": "Point", "coordinates": [ 11.569654, 48.135184 ] } },
    { "type": "Feature", "properties": { "Number": 8, "AttractionName": "Kaufingerstrasse/Neuhauserstrasse", "Type": "Shopping", "Latitude": 48.138169, "Longitude": 11.57152 }, "geometry": { "type": "Point", "coordinates": [ 11.57152, 48.138169 ] } },
    { "type": "Feature", "properties": { "Number": 9, "AttractionName": "Frauenkirche", "Type": "Religious", "Latitude": 48.138676, "Longitude": 11.573637 }, "geometry": { "type": "Point", "coordinates": [ 11.573637, 48.138676 ] } },
    { "type": "Feature", "properties": { "Number": 10, "AttractionName": "Karlsplatz", "Type": "Landmark", "Latitude": 48.139185, "Longitude": 11.566191 }, "geometry": { "type": "Point", "coordinates": [ 11.566191, 48.139185 ] } }
    ]
    }
            });

    map.addSource('district-boundaries', {
      type: 'geojson',
      data: 'data/OSM_munichdistricts_271222.geojson',
  })

  //Add source before this//          
  }

function addLayer() {
// For each source we added, we need to use map.addLayer() to add it to the map.
// map.setLayerZoomRange is used to set the layer zoom range
  map.addLayer({
    'id': 'englisch_garten',
    'type': 'line',
    'source': 'englisch_garten',
    'metadata': 'Englisch Garten',
    'layer.minZoom': 12,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
    'line-color': '#39753c',
    'line-width': 3.5,
    'line-opacity': 0.6,
    'line-dasharray': [1, 3]
    },
    'layout': {
      'visibility': 'visible'
  },
    'metadata': {
      'displayName': 'Englisch Garten Route',
      'showInLegend': true
}
    });

 
    map.addLayer({
        'id': 'walking-routes',
        'type': 'line',
        'source': 'walking-routes',
        'metadata': 'Walking Routes',
        'layer.minZoom': 9,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
        'line-color': ['get','color'], // ['get','color']
        'line-width': 6,
        'line-opacity': 0.5,
        },
        'metadata': {
          'displayName': 'Walking Routes',
          'showInLegend': true
    }
        });
    map.setLayerZoomRange('walking-routes', 12, 22);

        
    map.addLayer({
        'id': 'old-town-points',
        'type': 'circle',
        'source': 'old-town-points',
        'metadata': 'Old Town Points',
        'layer.minZoom': 12,
        'paint': {
        'circle-color': '#fbb904', // ['get','color']
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
        },
        'layout': {
          'visibility': 'visible'
      },
        'metadata': {
          'displayName': 'Old Town Points',
          'showInLegend': true
    }
        });
    map.setLayerZoomRange('old-town-points', 12, 22);


    map.addLayer({
      id: 'district-line',
      type: 'line',
      source: 'district-boundaries',
      paint: {
          'line-color': '#48afef',
          'line-width': 2,
          'line-opacity': 0.7
      },
      layout: {
        visibility: 'visible'
    },
      metadata: {
        displayName: 'Munich Districts',
        showInLegend: true
  }
  });

  map.setLayerZoomRange('district-line', 9, 14);


 //Add layer before this// 
}

// Here when map loads a style, we run the functions addSource() and addLayer() we created above 
//which adds all the geojson sources and adds to the maps as layers.
map.on('style.load', function() {
		  addSource();
		  addLayer();

  // TOGGLE LAYERS ON AND OFF
  // If these layers were not added to the map, abort
  // if (
  //   !map.getLayer("old-town-points") ||
  //   !map.getLayer("munich-intro-tour-points") ||
  //   !map.getLayer("old-town-route") ||
  //   !map.getLayer("walking-routes") ||
  //   !map.getLayer("district-line")
  // ) {
  //   return;
  // }

  // // Enumerate ids of the layers.
  // // const toggleableLayerIds = ['old-town-points', 'munich-intro-tour-points', 'old-town-route','walking-routes'];

  // // Create object with id and display names
  // const toggleableLayers = [
  //   {
  //     id: "old-town-points",
  //     displayLabel: "Old Town Points"
  //   },
  //   {
  //     id: "munich-intro-tour-points",
  //     displayLabel: "Munich Intro Points"
  //   },
  //   {
  //     id: "old-town-route",
  //     displayLabel: "Old Town Route"
  //   },
  //   {
  //     id: "walking-routes",
  //     displayLabel: "Walking Routes"
  //   },
  //   {
  //     id: "district-line",
  //     displayLabel: "Munich Districts"
  //   }
  // ];

  // // Set up the corresponding toggle button for each layer.
  // for (const layer of toggleableLayers) {
  //   // Create a link.

  //   const link = document.createElement("a");
  //   link.id = layer.id;
  //   link.href = "#";
  //   link.textContent = layer.displayLabel; //change this for layer label
  //   link.className = "active";

  //   // Show or hide layer when the toggle is clicked.
  //   link.onclick = function (e) {
  //     const clickedLayer = this.id;
  //     console.log("click", clickedLayer);

  //     e.preventDefault();
  //     e.stopPropagation();

  //     const visibility = map.getLayoutProperty(clickedLayer, "visibility");

  //     // Toggle layer visibility by changing the layout object's visibility property.
  //     if (visibility === "visible") {
  //       map.setLayoutProperty(clickedLayer, "visibility", "none");
  //       this.className = "";
  //     } else {
  //       this.className = "active";
  //       map.setLayoutProperty(clickedLayer, "visibility", "visible");
  //     }
  //   };

  //   const layers = document.getElementById("layernav");
  //   layers.appendChild(link);
  // }

		});

for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/' + layerId);
};
}

//data layers controls
toggleLayer = (ids, name) => {
	// const button = document.createElement('div');
	// button.classList.add('button');
	
  const checkbox = document.createElement('div');
	checkbox.classList.add('checkbox');
  checkbox.classList.add('checked');

	const label = document.createElement('p');
	label.innerHTML = `<p>${name}</p>`;
	checkbox.appendChild(label);
	
	//toggles properties when checkbox is clicked
	checkbox.onclick = function (e) {
		e.preventDefault();
		e.stopPropagation();
		for (layers in ids) {
			let visibility = map.getLayoutProperty(ids[layers], 'visibility');
			if (visibility === 'visible') {
				map.setLayoutProperty(ids[layers], 'visibility', 'none');
				checkbox.classList.remove('checked');
				checkbox.removeAttribute('id');

			} else {				
        map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        checkbox.classList.add('checked');
        checkbox.id = 'active';}
		}
	};

    let layers = document.getElementById('data-layers');
    layers.appendChild(checkbox);
}

//controller options
toggleLayer(['old-town-points'], 'Points');
toggleLayer(['district-line', 'englisch_garten'], 'Lines');
