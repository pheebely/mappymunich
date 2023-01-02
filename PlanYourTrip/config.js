'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/aiden1112/claren0tj001w15o20xw2uyb0',
  accessToken:
    'pk.eyJ1IjoiYWlkZW4xMTEyIiwiYSI6ImNsYXJiNWR0eTFkOTQzb25wbHhiY2tlMncifQ.1PbHt2YX0xMcRB7TOfYaaw',
  CSV: './MunichAccessiblePoints.csv',
  center: [11.576142,48.138275],
  zoom: 10,
  title: 'Mappy Munich',
  description:
    'Accessible location in Munich, Germany.',
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
