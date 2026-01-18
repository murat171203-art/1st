
export enum Language {
  KY = 'KY',
  TR = 'TR',
  RU = 'RU',
  EN = 'EN'
}

export enum DeliveryMethod {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL'
}

export type FormattingType = 'NONE' | 'COURSEWORK' | 'THESIS';
export type PrintType = 'BW' | 'COLOR';
export type TitlePageType = 'NONE' | 'STANDARD' | 'CUSTOM';

export interface OrderOptions {
  printOnly: boolean;
  printType: PrintType;
  titlePage: TitlePageType;
  checkErrors: boolean;
  formatting: FormattingType;
}

export interface PricingInfo {
  basePrice: number;
  perPageBW: number;
  perPageColor: number;
  titlePageBW: number;
  titlePageColor: number;
  titlePageCustomBW: number;
  titlePageCustomColor: number;
  checkPricePerPage: number;
  formatCoursework: number;
  formatThesis: number;
}

export interface OfficeLocation {
  id: string;
  nameKey: string;
  addressKey: string;
  coords: { lat: number; lng: number };
  workingHoursKey: string;
  isDeveloping?: boolean;
}

export interface OrderState {
  file: File | null;
  options: OrderOptions;
  delivery: DeliveryMethod;
  locationId: string;
  comment: string;
  pageCount: number;
}
