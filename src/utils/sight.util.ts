import { Sight } from '../modules/sight/sight.model';
import { getShortenedCityInfo } from './city.util';
import { getShortenedCoordinates } from './coordinates.util';
import { getShortenedCategories } from './category.util';

export function getShortenedSightsInfo(sights: Sight[]) {
  return (
    sights?.map((item) => {
      return getShortenedSightInfo(item);
    }) || []
  );
}

export function getShortenedSightInfo(sight: Sight) {
  const {
    city,
    coordinates,
    categories,
    date,
    name,
    founder,
    description,
    images,
    mainImage,
    rating,
    id,
  } = sight;
  return {
    location: getShortenedCityInfo(city),
    coordinates: getShortenedCoordinates(coordinates),
    categories: getShortenedCategories(categories),
    date,
    name,
    founder,
    description,
    images,
    mainImage,
    rating,
    id,
  };
}
