'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
  accessToken:
    'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw',
  CSV: './points.csv',
  center: [11.576142, 48.138275],
  zoom: 11,
  title: 'MAPPY MUNICH',
  description:
    'Accessible places in Munich, Germany. Use "Show Filter" option below to filter according to Amenity type. Once your selection is made, exit the filter window to view the map. ❗️❗️The map may take a few seconds to load❗️❗️',
  sideBarInfo: ['name', 'What','opening_hours'],
  popupInfo: ['name'],
  popupInfo2: ['website'],
  popupInfo3: ['opening_hours'],
  popupInfo4: ['What'],

  filters: [
    {
      type: 'dropdown',
      title: 'Accessible Toilet (WC): ',
      columnHeader: 'toilets:wheelchair', // Case sensitive - must match spreadsheet entry
      listItems: ['Fully Wheelchair Accessible','no'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'checkbox',
      title: 'Dining, Drinking & Nightlife: ',
      columnHeader: 'amenity',
      listItems: [
        'Cafe',
        'Canteen',
        'Restaurant',
        'Bar',
        'Pub',
        'Nightclub'
      ],
    },
    // {
    //   type: 'dropdown',
    //   title: 'Restaurant Cuisine',
    //   columnHeader: 'cuisine',
    //   listItems: [
    //     'Asian',
    //     'Bavarian',
    //     'Chinese',
    //     'French',
    //     'German',
    //     'Greek',
    //     'Italian',
    //     'Japanese',
    //     'Thai',
    //     'Turkish',
    //     'Vietnamese'
    //   ],
    // },
    {
      type: 'checkbox',
      title: 'Traffic & Transport ',
      columnHeader: 'PublicTraffic',
      listItems: [
        'Bus Stop',
        'Tram Stop',
        'Subway Station',
        'Train Station'
      ],
    },
    {
      type: 'checkbox',
      title: 'Hotels & Accommodations',
      columnHeader: 'tourism',
      listItems: [
        'Hotel',
        'Hostel',
        'Apartment',
        'Guest House'
      ],
    },
    {
      type: 'checkbox',
      title: 'Tours & Sightseeing: ',
      columnHeader: 'tourism',
      listItems: [
        'Attraction',
        'Artwork',
        'Gallery',
        'Museum House',
        'Tourist Information Center'
      ],
    },
    {
      type: 'checkbox',
      title: 'Infrastructure',
      columnHeader: 'amenity',
      listItems: [
        'Hospital',
        'Doctors',
        'Clinic',
        'Pharmacy',
        'Police',
        'University',
        'College',
        'Library',
        'Post Office',
        'Veterinary',
        'Marketplace',
      ],
    }
  ],
};
