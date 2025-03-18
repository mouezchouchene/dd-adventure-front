import { Pipe, PipeTransform } from '@angular/core';
import { CountriesServiceService } from 'src/app/services/countries/countries-service.service';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {
  constructor(private countriesService: CountriesServiceService) {}

  transform(countryCode: string): string {
    const country = this.countriesService.getCountries().find(c => c.name === countryCode);
    return country ? country.name : '';
  }
}