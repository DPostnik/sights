import { Coordinates } from '../../coordinates/coordinates.model';

export class CreateSightDto {
  readonly name: string;
  readonly cityId: number;
  readonly coordinates: Coordinates;
}
