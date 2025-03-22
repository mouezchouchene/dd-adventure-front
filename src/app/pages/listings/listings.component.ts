import { Component, OnInit } from '@angular/core';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {
  properties: any[] = [];

  constructor(private listingsService: PropertiesListingsService) {}

  ngOnInit() {
    this.loadPropertiesFromSearch(); 
  }

  onSearchPerformed(searchParams: any) {
    console.log('Search event received with params:', searchParams);
    this.loadPropertiesFromSearch(); 
  }

  loadPropertiesFromSearch() {
    const storedSearch = localStorage.getItem('searchParams');
    if (storedSearch) {
      const searchParams = JSON.parse(storedSearch);
      console.log('Search Params from localStorage:', searchParams);

      this.listingsService.searchProperties(searchParams).subscribe(
        (res: any[]) => {
          this.properties = res;
          console.log('Properties from API:', this.properties);
        },
        (error) => {
          console.error('Error fetching properties from search:', error);
          this.properties = []; 
        }
      );
    } else {
      console.log('No search parameters found in localStorage');
      this.properties = []; 
    }
  }
}