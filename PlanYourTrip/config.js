'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
  accessToken:
    'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw',
  CSV: './MunichAccessiblePoints.csv',
  center: [11.576142,48.138275],
  zoom: 10,
  title: 'Mappy Munich',
  description:
    'Accessible places in Munich, Germany.',
  sideBarInfo: ['name', 'opening_hours', 'website'],
  popupInfo: ['name'],
  filters: [
    {
      type: 'dropdown',
      title: 'Amenity: ',
      columnHeader: 'amenity',
      listItems: [
        'arts_centre',
        'atm',
        'bank',
        'bar',
        'cafe',
        'cinema',
        'clinic',
        'kindergarten'
      ],
    },
    {
      type: 'checkbox',
      title: 'Wheelchair available: ',
      columnHeader: 'wheelchair', // Case sensitive - must match spreadsheet entry
      listItems: ['limited', 'yes'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Restaurant: ',
      columnHeader: 'cuisine',
      listItems: [
        'afghan',
        'american',
        'arab',
        'asian',
        'chinese'
      ],
    },
  ],
};
