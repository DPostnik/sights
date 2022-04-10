import { Coordinates } from '../../coordinates/coordinates.model';

export class CreateSightDto {
  readonly name: string;
  readonly city: string;
  readonly coordinates: Coordinates;
  readonly categories?: string[];
  readonly images?: string[];
  readonly mainImage?: string;
}
