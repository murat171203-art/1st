
import { OfficeLocation, PricingInfo } from './types';

export const PRICING: PricingInfo = {
  basePrice: 50,
  perPageBW: 5,
  perPageColor: 10,
  titlePageBW: 5,
  titlePageColor: 10,
  titlePageCustomBW: 25,
  titlePageCustomColor: 35,
  checkPricePerPage: 2,
  formatCoursework: 200,
  formatThesis: 500,
};

export const CONTACTS = {
  whatsapp: '996555566667',
  telegram: 'hiprint1',
  phone: '+996 555 566 667'
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'manas-g',
    nameKey: 'locations.manasG',
    addressKey: 'locations.manasGAddr',
    coords: { lat: 42.8450, lng: 74.5850 },
    workingHoursKey: '07:00 - 20:00',
    mapUrl: 'https://go.2gis.com/6TVm2',
    phone: '+996 555 566 667'
  },
  {
    id: 'philharmony',
    nameKey: 'locations.philharmony',
    addressKey: 'locations.philharmonyAddr',
    coords: { lat: 42.8759, lng: 74.5885 },
    workingHoursKey: '09:30 - 18:00',
    mapUrl: 'https://go.2gis.com/vYXqB',
    phone: '+996 706 614 013'
  },
  {
    id: 'dzhamanbaeva',
    nameKey: 'locations.dzhamanbaeva',
    addressKey: 'locations.dzhamanbaevaAddr',
    coords: { lat: 42.8488, lng: 74.5921 },
    workingHoursKey: '08:00 - 21:00',
    mapUrl: 'https://go.2gis.com/uOiZ3',
    phone: '+996 706 229 979'
  }
];

export const WORKING_HOURS_DAYS = [
  { dayKey: 'Джал 30-43', hours: '07:00 - 20:00' },
  { dayKey: 'Филармония', hours: '09:30 - 18:00' },
  { dayKey: 'Комок', hours: '08:00 - 21:00' }
];
