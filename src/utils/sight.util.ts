import { Sight } from '../modules/sight/sight.model';
import { getShortenedCityInfo } from './city.util';
import { getShortenedCoordinates } from './coordinates.util';
import { getShortenedCategories } from './category.util';
import { City } from '../modules/city/city.model';
import { Region } from '../modules/region/region.model';
import { Country } from '../modules/country/country.model';
import { Coordinates } from '../modules/coordinates/coordinates.model';
import { Category } from '../modules/category/category.model';

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

export const sightIncludeForGetFullResource = {
  include: [
    {
      model: City,
      include: [
        {
          model: Region,
          include: [
            {
              model: Country,
            },
          ],
        },
      ],
    },
    Coordinates,
    Category,
  ],
};
