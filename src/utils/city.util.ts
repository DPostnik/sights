import { City } from '../modules/city/city.model';

export function getShortenedCityInfo(city: City) {
  return {
    city: city.name,
    region: city.region.name,
    country: city?.region?.country?.name,
  };
}

export function checkCityEqual(city1: string, city2: string): boolean {
  return city2 && city2 !== city1;
}
