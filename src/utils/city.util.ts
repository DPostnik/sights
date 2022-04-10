import { City } from '../modules/city/city.model';

export function getShortenedCityInfo(city: City) {
  return {
    name: city.name,
    region: {
      name: city.region.name,
    },
  };
}
