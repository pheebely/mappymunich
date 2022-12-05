// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
     
    map.on('mouseenter', 'walking-routes', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
     
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.name;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
     
    map.on('mouseleave', 'walking-routes', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });
