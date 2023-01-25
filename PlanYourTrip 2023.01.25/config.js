'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/pheebely/clazrqxnm000x15nwlwkpd8qn',
  accessToken:
    'pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw',
  CSV: './points.csv',
  center: [11.576142, 48.138275],
  zoom: 11,
  title: 'Mappy Munich',
  description:
    'Accessible location in Munich, Germany.',
  sideBarInfo: ['name', 'What','opening_hours'],
  popupInfo: ['name'],
  popupInfo2: ['website'],
  popupInfo3: ['opening_hours'],
  popupInfo4: ['What'],

  filters: [
    {
      type: 'dropdown',
      title: 'Toilet Accessibility: ',
      columnHeader: 'toilets:wheelchair', // Case sensitive - must match spreadsheet entry
      listItems: ['Fully Wheelchair Accessible', 'Partially Wheelchair Accessible','no'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
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
        'Railway Station'
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
