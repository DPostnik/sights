import { City } from '../modules/city/city.model';

export function getShortenedCityInfo(city: City) {
  return {
    city: city.name,
    country: city.region.country.name,
    region: city.region.name,
  };
}
