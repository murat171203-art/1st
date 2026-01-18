
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
  whatsapp: '555566667',
  telegram: 'hiprint1',
  phone: '+996 555 566 667'
};

export const STATS_DATA = {
  visitors: 12450,
  payments: 4580,
  completedWorks: 5200,
  pagesPrinted: 25400
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'manas-g',
    nameKey: 'locations.manasG',
    addressKey: 'locations.manasGAddr',
    coords: { lat: 42.8450, lng: 74.5850 },
    workingHoursKey: '07:30 - 19:00'
  },
  {
    id: 'philharmony',
    nameKey: 'locations.philharmony',
    addressKey: 'locations.philharmonyAddr',
    coords: { lat: 42.8759, lng: 74.5885 },
    workingHoursKey: '10:00 - 17:00'
  },
  {
    id: 'dzhamanbaeva',
    nameKey: 'locations.dzhamanbaeva',
    addressKey: 'locations.dzhamanbaevaAddr',
    coords: { lat: 42.8488, lng: 74.5921 },
    workingHoursKey: '08:00 - 20:00'
  }
];

export const WORKING_HOURS_DAYS = [
  { dayKey: 'G-Block (Ж блок)', hours: '07:30 - 19:00' },
  { dayKey: 'Philharmony (филармония)', hours: '10:00 - 17:00' },
  { dayKey: 'KOMOK (КОМОК)', hours: '08:00 - 20:00' }
];
