import { Coordinates } from '../coordinates/coordinates.model';

export function getShortenedCoordinates(coordinates: Coordinates): {
  latitude;
  longitude;
} {
  const { longitude, latitude } = coordinates;
  return {
    longitude,
    latitude,
  };
}
