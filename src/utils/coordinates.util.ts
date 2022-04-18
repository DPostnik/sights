import { Coordinates } from '../modules/coordinates/coordinates.model';

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

export function checkCoordinatesEqual(
  coordinates1: Coordinates,
  coordinates2: Coordinates,
): boolean {
  return (
    coordinates1.longitude !== coordinates2.longitude ||
    coordinates1.latitude !== coordinates2.latitude
  );
}
