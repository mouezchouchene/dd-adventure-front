import { Pipe, PipeTransform } from '@angular/core';
import { CountriesServiceService } from 'src/app/services/countries/countries-service.service';

@Pipe({
  name: 'countryPipe'
})
export class CountryPipePipe implements PipeTransform {

  constructor(private countriesService: CountriesServiceService)
  {}

  transform(countryCode: string): string {
    const country = this.countriesService.getCountries().find(c => c.key === countryCode);
    return country ? country.value : ''; 
  }

}
