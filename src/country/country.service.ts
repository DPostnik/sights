import { Injectable } from '@nestjs/common';
import { CountryInterface } from './interfaces/country.interface';

@Injectable()
export class CountryService {
  private countries: CountryInterface[] = [];

  create(country: CountryInterface): CountryInterface {
    this.countries.push(country);
    return country;
  }

  remove(id: string): CountryInterface[] {
    this.countries = this.countries.filter(
      (item: CountryInterface) => item.id !== id,
    );
    return this.countries;
  }

  getAll(): CountryInterface[] {
    return this.countries;
  }
}
