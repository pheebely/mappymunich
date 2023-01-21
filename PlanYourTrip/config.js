'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
  accessToken:
    'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw',
  CSV: './points.csv',
  center: [11.576142,48.138275],
  zoom: 10,
  title: 'MAPPY MUNICH',
  description:
    'Accessible places in Munich, Germany. <br> Use "Show Filter" option below to filter according to Amenity and Wheelchair Accessibility type.',
  sideBarInfo: ['name', 'amenity','tourism','opening_hours'],
  popupInfo: ['name'],
  popupInfo2: ['website'],
  popupInfo3: ['opening_hours'],

  filters: [
    {
      type: 'checkbox',
      title: 'Accessibility: ',
      columnHeader: 'wheelchair', // Case sensitive - must match spreadsheet entry
      listItems: ['Fully Wheelchair Accessible', 'Partially Wheelchair Accessible'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Dining, Drinking & Nightlife: ',
      columnHeader: 'amenity',
      listItems: [
        'Restaurant',
        'Bar',
        'Pub',
        'Nightclub'
      ],
    },
    {
      type: 'dropdown',
      title: 'Restaurant: ',
      columnHeader: 'cuisine',
      listItems: [
        'Asian',
        'Vietnamese',
        'Chinese',
        'Spanish',
        'Italian'
      ],
    },
  ],
};
