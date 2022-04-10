import { City } from '../modules/city/city.model';

export function getShortenedCityInfo(city: City): string {
  return city.name;
}
