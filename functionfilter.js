// mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkZW4xMTEyIiwiYSI6ImNsYXJiNWR0eTFkOTQzb25wbHhiY2tlMncifQ.1PbHt2YX0xMcRB7TOfYaaw';
  //   // This GeoJSON contains features that include an "icon"
  //   // property. The value of the "icon" property corresponds
  //   // to an image in the Mapbox Light style's sprite. (Note:
  //   // the name of images is the value of the "icon" property
  //   // + "-15".)
  const places = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'icon': 'theatre'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.574731,48.136981]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'shop'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.575583,48.136754]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'bar'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.573034,48.137555 ]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'bicycle'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.576938,48.136034]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'cafe'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.573468,48.136844]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'music'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.575645,48.137420]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'music'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [11.575062,48.136456]
            }
        }
    ]
};

const filterGroup = document.getElementById('filter-group');

map.on('style.load', () => {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('places', {
        'type': 'geojson',
        'data': places
    });

    for (const feature of places.features) {
        const symbol = feature.properties.icon;
        const layerID = `poi-${symbol}`;

        // Add a layer for this symbol type if it hasn't been added already.
        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    // These icons are a part of the Mapbox Light style.
                    // To view all images available in a Mapbox style, open
                    // the style in Mapbox Studio and click the "Images" tab.
                    // To add a new image to the style at runtime see
                    // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                    'icon-image': `${symbol}`,
                    'icon-allow-overlap': true
                },
                'filter': ['==', 'icon', symbol]
            });

            // Add checkbox and label elements for the layer.
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = true;
            filterGroup.appendChild(input);

            const label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = symbol;
            filterGroup.appendChild(label);

            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', (e) => {
                map.setLayoutProperty(
                    layerID,
                    'visibility',
                    e.target.checked ? 'visible' : 'none'
                );
            });
        }
    }
});