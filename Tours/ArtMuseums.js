const home = [11.570874, 48.146521]; //coordinates for the default "home" view

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/pheebely/cldbufm3n005101r08qkyvuy1",
  center: home,
  zoom: 15,
  minZoom: 9,
  maxZoom: 18,
  pitch: 35, // pitch in degrees
  projection: "globe",
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
        type: "Point",
        coordinates: [lng, lat],
      },
      place_name: "Lat: " + lat + " Lng: " + lng,
      place_type: ["coordinate"],
      properties: {},
      type: "Feature",
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
    reverseGeocode: true,
  })
);

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  })
);

// Add home button to fly to home
const homePosition = {
  center: home,
  zoom: 15,
  pitch: 40,
  bearing: 0,
};

class HomeButton {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    this.container.innerHTML = `<button class="icon" title="Home"><i class="fa-solid fa-house"></i></button>`;
    this.container.addEventListener("click", () => map.flyTo(homePosition));
    return this.container;
  }
  onRemove() {
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

const attractions = {
  type: "FeatureCollection",
  name: "ArtMuseums",
  features: [
    {
      type: "Feature",
      properties: {
        Number: 1,
        Name: "Alte Pinakothek",
        Latitude: 48.147989,
        Longitude: 11.571022,
        Type: "Museum",
        Address: "Barer Straße 27, 80333 München",
        Hours:
          "Tue 10:00 a.m.-8:00 p.m., Wed-Sun 10:00 a.m.-6.00 p.m. ,  Mon-Closed.",
        MustSee: '<i class="fa-solid fa-fire"></i>',
        MVV: "Tram 27, N27 (exit onto the street, therefore not suitable with a rollator or walking aid!), Bus 58, 68, 100 Pinakotheken\nU2, U8 Theresienstraße\nU3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz",
        Access: "Ramp at the main entrance, existent elevators",
        Description:
          "Fantastic museum to visit if you admire the classics. Thorough selection of Reubens, Turner, Monet, and van Gogh.... and a terrific copy of the Mona Lisa in better condition than the original hanging in the Louvre. The Alte Pinakothek has over 8,000 valuable pieces of art created before the 19th century. Collections include works by German artists between the 14th and 18th centuries, paintings of Dutch masters created between the 15th and 18th centuries, Flemish masterpieces, Italian, French and Spanish works from the 13th to the 18th centuries. A notable work is Rubens’ vast canvas called the ‘Last Judgment’. ",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/alte-pinakothek-02.jpeg?h=08b866d1'",
        image2: null,
        imgsource: "Katy Spichal",
        Website: "www.pinakothek.de/en",
        Phone: "49 (0) 89 / 23805-216",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text:
          "On the North side (access from Arcis- and Barer Straße, ring at the gate, have your Blue Badge ready), 3 spaces Theresienstraße 72 (corner Barer Straße)",
        elevator: null,
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: null,
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.571022, 48.147989] },
    },
    {
      type: "Feature",
      properties: {
        Number: 2,
        Name: "Brandhorst Museum",
        Latitude: 48.148153,
        Longitude: 11.574513,
        Type: "Museum",
        Address: "Theresienstraße 35 a, 80333 München",
        Hours: "Tu-Su 10:00 - 18:00, Th 10:00-20:00, Mon-Closed.",
        MustSee: null,
        MVV: "Tram 27, N27 (exit onto the street, therefore not suitable with a rollator or walking aid!), Bus 58, 68, 100 Pinakotheken, Bus 68, 100 Maxvorstadt/Sammlung Brandhorst",
        Access:
          "At ground level, automatic door opener, elevators to all levels",
        Description:
          "The Brandhorst Museum displays the collection of contemporary art belonging to Udo Fritz-Hermann and his wife, Anette Brandhorst. The brightly colored eco friendly building is also regarded by the locals as a magnificent work of modern architecture. Exhibits at the Brandhorst Museum include over 60 canvases by the American artist, Cy Twombly, a 100 works of Andy Warhol and works by Jannis Kounellis, Georg Baselitz, Gerhard Richter and Bruce Nauman. Among the museum’s treasures is a display of 112 original editions of books illustrated by Picasso.\n",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/44_1_MuseumBrandhorst_Au%C3%9Fenansicht.jpg?h=f8390da7'",
        image2:
          "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/museum_brandhorst.klein.jpg'",
        imgsource: "Andreas Lechtape, muenchen-tourismus-barrierefrei.de",
        Website: "https://www.museum-brandhorst.de/en/",
        Phone: "49 (0) 89 / 23805-2286",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text: "2 spaces in front of the museum",
        elevator: '<i class="fa-solid fa-elevator"></i>',
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: null,
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.574513, 48.148153] },
    },
    {
      type: "Feature",
      properties: {
        Number: 3,
        Name: "Galerie Thomas",
        Latitude: 48.146299,
        Longitude: 11.573464,
        Type: "Gallery",
        Address: "Türkenstraße 16\n80333 München",
        Hours: "Mo-Fri 9:00-18:00, Sa 10-18:00",
        MustSee: null,
        MVV: "Tram, No 27: Stop Pinakotheken; U-Bahn, U3 | U6: Stop Universität; Bus,No 100 (Museumslinie/museum line): Stop Pinakotheken",
        Access:
          "Barrier-free access at the main entrance via a ramp. The gallery has a lift. Access to all gallery is guaranteed. Barrier-free toilets are located in the gallery.",
        Description:
          'Galerie Thomas is specialized in the German Expressionism and Classical Modernism. Founded by Raimund Thomas in 1964, today it is one of the leading international galleries in this area. Here you can find a wide collection of artworks from artists such as Wassily Kandinsky, Alexej Jawlensky, August Macke, Franz Marc, Ernst Ludwig Kirchner, Otto Mueller, Karl Schmidt-Rottluff and others. For many years, Galerie Thomas has also been a regular exhibitor at national and international art fairs such as "ART" in Basel and Miami, "ART Cologne", and "TEFAF" in Maastricht.\n',
        image:
          "src='https://www.galerie-thomas.de/files/images/Die-Galerie/_750xAUTO_fit_center-center_none/Galerie_Fassade_T16.jpg'",
        image2: null,
        imgsource: "Galerie Thomas",
        Website: "https://kunstareal.de/en/galleries/galerie-thomas-modern",
        Phone: "49-89-290008-0",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: null,
        parking_text: null,
        elevator: '<i class="fa-solid fa-elevator"></i>',
        elderly: null,
        stroller: null,
        guidedTour: null,
        guideDog: null,
        audioGuide: null,
      },
      geometry: { type: "Point", coordinates: [11.573464, 48.146299] },
    },
    {
      type: "Feature",
      properties: {
        Number: 4,
        Name: "Pinakothek der Moderne",
        Latitude: 48.146521,
        Longitude: 11.571874,
        Type: "Museum",
        Address: "Barer Straße 40, 80333 München",
        Hours: "Tu, Wed, Fr-Su 10:00-18:00\nTh 10:00-20:00,  Mon-Closed",
        MustSee: null,
        MVV: "Tram 27, N27 (exit onto the street, therefore not suitable with a rollator or walking aid!), Bus 58, 68, 100 Pinakotheken\nU2, U8 Theresienstraße\nU3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz",
        Access:
          'On ground level, electric door opener, elevators from the rotunda to all levels. The elevator to the collection "Design" is hard to find, don\'t hesitate to ask for assistance. The "Danner Rotunda" in the "Design" collection is accessible only by steps with a patchy handrail on one side.',
        Description:
          "The Pinakothek der Moderne in Munich unifies four art disciplines, paintings, graphics, architecture and design. It is one of the most visited contemporary art museums in Europe. The collection of modern paintings represents the 20th and 21st century with works by German and international artists on display. Video, photo and new media works are also displayed here. There are about 400,000 graphic sheets including old German and Dutch sketches, 19th century and contemporary works. The architecture museum hosts temporary exhibitions displaying blueprints, drawings, photographs, models and computer animations. The design collection has objects relating to industrial design, motor vehicle design, graphic design, and computer-generated models. \n",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/Pinakothek-der-Moderne.png?h=707772c7'",
        image2:
          "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/pinakothek_der_moderneklein.jpg'",
        imgsource: "muenchen.de, muenchen-tourismus-barrierefrei.de",
        Website: "www.pinakothek-der-moderne.de/en/",
        Phone: "49 (0) 89 / 23805–360",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text:
          "2 spaces (access via Gabelsbergerstraße, use the bell at the gateway and keep your Blue Badge ready. The bottom covering is gravel.), 2 spaces Theresienstraße 72 (corner Barerstraße)",
        elevator: '<i class="fa-solid fa-elevator"></i>',
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: null,
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.571874, 48.146521] },
    },
    {
      type: "Feature",
      properties: {
        Number: 5,
        Name: "Egyptian Museum Munich",
        Latitude: 48.147443,
        Longitude: 11.568546,
        Type: "Museum",
        Address: "Gabelsbergerstraße 35, 80333 München",
        Hours:
          "Tu 10:00-20:00\nWed - Su 10:00-18:00\n(Mon-Closed,  except Easter Monday and Whit Monday)",
        MustSee: null,
        MVV: "Tram 27, N27 (exit onto the street, therefore not suitable with a rollator or walking aid!), Bus 58, 68, 100 Pinakotheken\nU2, U8 Theresienstraße\nU3-U6, Bus 100, 153, N40, N41, N45 Odeonsplatz",
        Access: "There are elevators",
        Description:
          "Exhibits from all periods of the history of ancient Egypt are displayed at this museum. Exhibits include statues, sculptures, papyri, stone tablets with hieroglyphics, glassware, textiles and pottery. Famous works on display are a double sided statue of Pharaoh Nyuserre Ini, with one side showing him as a young man and the other as an old man, statues of Pharaoh Ramses II and Tutmosis II and a collection of jewelry belonging to the Nubian Queen Amanishakheto. The museum periodically holds special themed exhibitions and offers conducted tours for children during the summer holidays.",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/staatliches-museum-aegyptischer-kunst-06.jpeg?h=84071268'",
        image2:
          "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/aegyptisches_museum_eingang.klein.jpg'",
        imgsource: "Marianne Franke, muenchen-tourismus-barrierefrei.de",
        Website: "https://smaek.de/en/",
        Phone: "49 (0) 89 / 28927-630",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text: "3 spaces Theresienstraße 72",
        elevator: '<i class="fa-solid fa-elevator"></i>',
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: null,
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.568546, 48.147443] },
    },
    {
      type: "Feature",
      properties: {
        Number: 6,
        Name: "Glyptothek",
        Latitude: 48.145825,
        Longitude: 11.565192,
        Type: "Museum",
        Address: "Königsplatz 3, 80333 München",
        Hours:
          "Tu, Wed, Fr 10:00-17:00, Th until 20:00; if the Thursday is a bank holiday only until 17:00,  Mon-Closed.",
        MustSee: null,
        MVV: "U2, U8, Bus 58, 68, 100 Königsplatz, Tram 27, 28, N27 Karolinenplatz",
        Access:
          "For wheelchair users from the rear via a ramp with small cobblestones and 6% gradient. Bell 85 cm high. Threshold 4 cm high.\nInside to one hall 2 ramps with 14 % incline, handrail right and left only partial.\nPlatform lift to inner courtyard with a capacity of 300 kg.\nInner courtyard with large paving stones and large slabs.",
        Description:
          "The Glyptotheck is a Greek and Roman Sculpture Museum. It was constructed between 1816 and 1830 in neoclassical style to resemble a Greek Temple. The architect, Leo von Klenze, designed the building. Originally, all the walls of the structure were made of marble. The classical style building has an Ionic portico and the exterior walls have niches where 18 original Greek and Roman sculptures were installed. Well known pieces at the Glyptotheck are the Munich Kouros and the temple figures of Aegina from the archaic period, the portrait of Homer and the Medusa Rondanini from the classical period, the Barberini Faun, which is regarded as the most famous sculpture from the Hellenistic period, and Roman busts including those of Emperor Augustus, Nero, Septimius Severus and his wife, Julia Domna. ",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-07/glypto-neu.png?h=30098a68'",
        image2:
          "src='https://www.muenchen-tourismus-barrierefrei.de/images/glyptothek_hubliftklein.jpg'",
        imgsource: "Michael Hofmann, muenchen-tourismus-barrierefrei.de",
        Website:
          "https://www.antike-am-koenigsplatz.mwn.de/glyptothek-muenchen.html",
        Phone: "49 (0) 89  28 61 00",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text: "2 spaces in Luisenstraße 29",
        elevator: null,
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: '<i class="fa-solid fa-dog"></i>',
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.565192, 48.145825] },
    },
    {
      type: "Feature",
      properties: {
        Number: 7,
        Name: "Lenbachhaus",
        Latitude: 48.146756,
        Longitude: 11.564377,
        Type: "Museum",
        Address: "Luisenstraße 33, 80333 München",
        Hours: "\nTu 10:00-21:00, Wed-Su 10:00-18:00 (Mon-Closed)",
        MustSee: null,
        MVV: "U2, U8, Bus 58, 68, 100 Königsplatz, Tram 27, 28, N27 Karolinenplatz",
        Access:
          "At ground level, electric door openers. Stairlift (max. weight 300 kg, only with staff), elevators to all levels.\nGarden: the bell at the entrance is 120 cm high, pavement: tiling and gravel.",
        Description:
          "It houses a gallery displaying contemporary art including works of eminent Munich-based artists. A variety of contemporary Munich-based and international artists are represented at the Lenbachhaus art gallery. The works on display include paintings by Munich artists of the 19th and 20th centuries. Notable works are from a collection of works of a group of early 20th-century expressionist artists called the Blaue Reiter. The collection was donated in 1957 by Gabriele Munter, one of the best-known members of the group. International works on display include paintings by Andy Warhol and Joseph Beuys. Exhibitions promoting works by new contemporary artists are regularly held at the Kunstbau.\n\n",
        image:
          "src='https://www.muenchen.de/sites/default/files/styles/3_2_w1216/public/2022-06/34_2_Florian%20Holzherr.jpeg?h=7f8854f4'",
        image2:
          "src='https://www.muenchen-tourismus-barrierefrei.de/images/stories/lenbachhaus_eingang.klein.jpg'",
        imgsource:
          "Städtische Galerie im Lenbachhaus und Kunstbau, muenchen-tourismus-barrierefrei.de",
        Website: "www.lenbachhaus.de",
        Phone: "49 (0) 89 / 233-32000",
        wheelchair: '<i class="fa-brands fa-accessible-icon"></i>',
        wc: '<i class="fa-solid fa-restroom"></i>',
        parking: '<i class="fa-solid fa-square-parking"></i>',
        parking_text: "2 spaces Luisenstraße 33",
        elevator: '<i class="fa-solid fa-elevator"></i>',
        elderly: null,
        stroller: null,
        guidedTour: '<i class="fa-solid fa-flag"></i>',
        guideDog: null,
        audioGuide: '<i class="fa-solid fa-headphones"></i>',
      },
      geometry: { type: "Point", coordinates: [11.564377, 48.146756] },
    },
  ],
};

console.log(attractions);

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

  map.addSource("Art-Museum-Route", {
    type: "geojson",
    data: "/data/Art-Museums-Route.geojson",
  });

  //Add source before this//
}

function addLayer() {
  // For each source we added, we need to use map.addLayer() to add it to the map.
  // map.setLayerZoomRange is used to set the layer zoom range

  map.addLayer({
    id: "Art-Museum-Route",
    type: "line",
    source: "Art-Museum-Route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#48a2b8", // ['get','color']
      "line-width": 6,
      "line-opacity": 0.8,
      "line-blur": 1.5,
    },
  });
  map.setLayerZoomRange("Art-Museum-Route", 12, 22);

  //Add layer before this//
}

// Here when map loads a style, we run the functions addSource() and addLayer() we created above
//which adds all the geojson sources and adds to the maps as layers.
map.on("style.load", function () {
  const layers = map.getStyle().layers;

  map.addSource("ArtMuseums", {
    type: "geojson",
    data: attractions,
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
    map.setStyle("mapbox://styles/" + layerId);
  };
}

/**
 * Add a marker to the map for every attraction listing.
 **/
function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  for (const marker of attractions.features) {
    /* Create a div element for the marker. */
    const el = document.createElement("div");
    /* Assign a unique `id` to the marker. */
    el.id = `marker-${marker.properties.Number}`;
    /* Assign the `marker` class to each marker for styling. */
    el.className = "marker";
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
    el.addEventListener("click", (e) => {
      /* Fly to the point */
      flyToattraction(marker);
      /* Close all other popups and display popup for clicked attraction */
      createPopUp(marker);
      /* Highlight listing in sidebar */
      const activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("activeList");
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(
        `listing-${marker.properties.Number}`
      );
      listing.classList.add("active");
      // Scroll to the clicked item smoothly
      setTimeout(() => {
        const parentDiv = listing.parentElement; // Get the scrollable container
        parentDiv.scrollTo({
          top: listing.offsetTop - parentDiv.offsetTop, // Moves item to the top
          behavior: "smooth",
        });
      }, 100);

      //Highlight marker on click
      const activeMarker = document.getElementsByClassName("activeClick");
      e.stopPropagation();
      if (activeMarker[0]) {
        activeMarker[0].classList.remove("activeClick");
      }
      const markerOn = document.getElementById(
        `marker-${marker.properties.Number}`
      );
      markerOn.classList.add("activeClick");
    });

    //Highlight listing in sidebar when hover on marker
    el.addEventListener("mouseenter", (e) => {
      /* Highlight listing in sidebar */
      const activeItem = document.getElementsByClassName("activeList");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("activeList");
      }
      const listing = document.getElementById(
        `listing-${marker.properties.Number}`
      );
      listing.classList.add("activeList");
    });

    //Stop highlighting sidebar on mouse leave marker
    el.addEventListener("mouseleave", (e) => {
      const activeItem = document.getElementsByClassName("activeList");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("activeList");
      }
    });

    // Create function for when pop.remove() then all active markers will be removed.
    // const popup = new mapboxgl.Popup({ closeOnClick: true });

    el.addEventListener("popup.close", function () {
      const activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("activeList");
        activeItem[0].classList.remove("active");
        activeItem[0].classList.remove("activeClick");
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
    const listings = document.getElementById("listings");
    const listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${attraction.properties.Number}`;
    /* Assign the `item` class to each listing for styling. */
    listing.className = "item";

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.id = `link-${attraction.properties.Number}`;
    link.innerHTML = `<span class="pin"><img src="../images/location-pin-solid-list.svg" width="20"><span class="pinTitle">${attraction.properties.Number}&nbsp;&nbsp;&nbsp;</span></span> ${attraction.properties.Name}&nbsp;&nbsp;`;

    if (attraction.properties.MustSee) {
      link.innerHTML += `${attraction.properties.MustSee}`;
    }

    /* Add details to the individual listing. */
    const details = listing.appendChild(document.createElement("div"));
    details.className = "details";
    details.innerHTML = `
          <ul>
          <li><i><b><font color="#9f9f9f"><font size="normal">${attraction.properties.Type}</font color></font size></b></i></li>
          <li>${attraction.properties.Address}</li>
          <li><i>${attraction.properties.Hours}</i>&nbsp;
          <a href=${attraction.properties.Website}><i class="fa-solid fa-link"></i></a></li></ul>`;

    if (attraction.properties.parking_text) {
      details.innerHTML += `<ul><li><b>Disabled Parking:</b>&nbsp;${attraction.properties.parking_text}</li></ul>`;
    }

    if (attraction.properties.MVV) {
      details.innerHTML += `<ul><li><b>MVV:</b>&nbsp;${attraction.properties.MVV}</li></ul>`;
    }

    details.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;

    if (attraction.properties.wheelchair) {
      details.innerHTML += `${attraction.properties.wheelchair}&nbsp;&nbsp;`;
    }

    if (attraction.properties.elderly) {
      details.innerHTML += `${attraction.properties.elderly}&nbsp;&nbsp;`;
    }

    if (attraction.properties.stroller) {
      details.innerHTML += `${attraction.properties.stroller}&nbsp;&nbsp;`;
    }

    if (attraction.properties.wc) {
      details.innerHTML += `${attraction.properties.wc}&nbsp;&nbsp;`;
    }
    if (attraction.properties.parking) {
      details.innerHTML += `${attraction.properties.parking}&nbsp;&nbsp;`;
    }
    if (attraction.properties.elevator) {
      details.innerHTML += `${attraction.properties.elevator}&nbsp;&nbsp;`;
    }
    if (attraction.properties.guideDog) {
      details.innerHTML += `${attraction.properties.guideDog}&nbsp;&nbsp;`;
    }
    if (attraction.properties.audioGuide) {
      details.innerHTML += `${attraction.properties.audioGuide}&nbsp;&nbsp;`;
    }
    if (attraction.properties.guidedTour) {
      details.innerHTML += `${attraction.properties.guidedTour}&nbsp;&nbsp;`;
    }
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
    link.addEventListener("click", function () {
      for (const feature of attractions.features) {
        if (this.id === `link-${feature.properties.Number}`) {
          flyToattraction(feature);
          createPopUp(feature); //closePopup(feature)

          //Remove highlight for all other markers
          const activeMarker = document.getElementsByClassName("activeClick");
          if (activeMarker[0]) {
            activeMarker[0].classList.remove("activeClick");
            // activeMarker[0].classList.remove('activeHover');
          }
          // If marker ID matches the listing, then add activeClick class to highlight the marker.
          const markerOn = document.getElementById(
            `marker-${feature.properties.Number}`
          );
          markerOn.classList.add("activeClick");
          //Remove activeHover class when marker highlighted with click
          markerOn.classList.remove("activeHover");
        } // end of IF statement

        // Highlight listing in sidebar:
        // If activeItem doesn't match listing that is clicked on, then remove 'active' class.
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        //For the element associated with the click listing, add 'active' class.
        this.parentNode.classList.add("active");
      }
    });

    //Listen to the element and when it is hovered on, do this:
    //1. Update the `currentFeature` to the attraction associated with the clicked link
    //2. Highlight listing in map
    //3. Stop highlighting listing when mouse leaves
    //   - BUG: Listing is still highlighted on hover even after it is highlighted on click.

    link.addEventListener("mouseenter", function () {
      for (const feature of attractions.features) {
        if (this.id === `link-${feature.properties.Number}`) {
          //Highlight marker on hover on listing in the sidebar and remove highlight for other markers
          const activeMarker = document.getElementsByClassName("activeHover");
          if (activeMarker[0]) {
            activeMarker[0].classList.remove("activeHover");
          }

          const markerOn = document.getElementById(
            `marker-${feature.properties.Number}`
          );
          markerOn.classList.add("activeHover");

          // If listing is already active from mouseclick on marker or listing, remove activeHover:
          const activeListing = document.getElementsByClassName("activeList");
          if (activeListing === true) {
            activeListing.classList.remove("activeHover");
          }

          const activeListingmarker =
            document.getElementsByClassName("activeClick");
          if (activeListingmarker === true) {
            activeListingmarker.classList.remove("activeHover");
          }
        } //end of IF statement
      }
    });

    // On 'mouseleave' listings, no markers are highlighted.
    link.addEventListener("mouseleave", function () {
      for (const feature of attractions.features) {
        if (this.id === `link-${feature.properties.Number}`) {
          const markerOff = document.getElementById(
            `marker-${feature.properties.Number}`
          );
          markerOff.classList.remove("activeHover");
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
    zoom: 16.5,
  });
}

/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
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
  popup.on("close", () => {
    console.log("popup was closed");
  });
}

/**
 * Close all other popups and display marker for clicked attraction in the sidebar.
 **/
function closePopUp(currentFeature) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  const popup = new mapboxgl.Popup({ closeOnClick: true }).setLngLat(
    currentFeature.geometry.coordinates
  );
}
