import { Coordinates } from '../../coordinates/coordinates.model';
import { City } from '../../city/city.model';

export class CreateSightDto {
  readonly name: string;
  readonly city: City;
  readonly coordinates: Coordinates;
}
