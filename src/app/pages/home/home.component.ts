import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

interface Destination {
  streetAddress: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  properties: any[] = [];

  searchControl = new FormControl('');
  destination: string = '';
  selectedDestination: Destination | null = null;
  startDate: Date | null = new Date();
  endDate: Date | null = null;
  guests: number = 0;
  filteredDestinations: Destination[] = [];
  destinationSelected: boolean = false;
  isGuestsModalOpen: boolean = false;
  adults: number = 1;
  children: number = 0;
  rooms: number = 1;
  pets: boolean = false;

  constructor(private listingsService: PropertiesListingsService , private router:Router) {

    this.startDate = new Date();
    this.startDate.setHours(0, 0, 0, 0); 

    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);

    this.searchControl.valueChanges.subscribe(value => {
      this.filterDestinations(value);
      this.destinationSelected = false;
    });

    this.guests=this.children+this.adults;
    this.getAllProperties();
  }

  getAllProperties() {
    this.listingsService.getAllListings().subscribe(
      (res: any) => {
        this.properties = res;
        console.log("Properties loaded:", this.properties);
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  onSearchPerformed(queryParams: any) {
    console.log('Search performed with params:', queryParams);
    // Optionally handle the search params here instead of relying solely on router navigation
  }

  myDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d != null && d >= today;
  };

  endDateFilter = (d: Date | null): boolean => {
    if (!d || !this.startDate) return false;
    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0);
    const selected = new Date(d);
    selected.setHours(0, 0, 0, 0);
    return selected > start;
  };

  
  updateEndDate() {
    if (this.startDate) {
      const newEndDate = new Date(this.startDate);
      newEndDate.setDate(this.startDate.getDate() + 1);
      
      if (!this.endDate || this.endDate < newEndDate) {
        this.endDate = newEndDate;
      }
    }
  }

  filterDestinations(searchString: string | null) {
    if (!searchString) {
      this.filteredDestinations = [];
      return;
    }

    const lowerCaseSearch = searchString.toLowerCase();
    this.filteredDestinations = this.properties
      .filter(property => {
        const streetAddress = property.streetAddress || '';
        const city = property.city || '';
        const country = property.country || '';
        const place = property.place || '';

        return (
          streetAddress.toLowerCase().includes(lowerCaseSearch) ||
          city.toLowerCase().includes(lowerCaseSearch) ||
          country.toLowerCase().includes(lowerCaseSearch) ||
          place.toLowerCase().includes(lowerCaseSearch)
        );
      })
      .map(property => ({
        streetAddress: property.streetAddress || 'Unknown Address',
        country: property.country || 'Unknown Country',
        city: property.city || 'Unknown City'
      }));
  }

  selectDestination(destination: Destination) {
    this.searchControl.setValue(destination.streetAddress);
    this.destination = destination.streetAddress;
    this.selectedDestination = destination;
    this.filteredDestinations = [];
    this.destinationSelected = true;
  }

  toggleGuestsModal() {
    this.isGuestsModalOpen = !this.isGuestsModalOpen;
  }

  updateGuests() {
    this.guests = this.adults + this.children;
    this.toggleGuestsModal();
    console.log('Guests:', this.guests);
    console.log('Adults:', this.adults);
    console.log('Children:', this.children);
    console.log('Rooms:', this.rooms);
    console.log('Pets:', this.pets);
  }

  onSearch(): void {
    
    const queryParams = {
      streetAddress: this.destination || '',
      city: this.selectedDestination?.city || '', 
      country: this.selectedDestination?.country || '', 
      startDate: this.startDate ? this.startDate.toISOString().split('T')[0] : '',
      endDate: this.endDate ? this.endDate.toISOString().split('T')[0] : '',
      guests: this.guests.toString(),
      rooms: this.rooms.toString(),
      pets: this.pets.toString()
    };

    console.log('Query Params:', queryParams); 

    this.router.navigate(['/search'], { queryParams });
  }

 

  private performSearch(): any[] {
    return this.properties.filter(property => {
      const matchesDestination = this.destination
        ? (property.streetAddress || '').toLowerCase().includes(this.destination.toLowerCase()) ||
          (property.city || '').toLowerCase().includes(this.destination.toLowerCase()) ||
          (property.country || '').toLowerCase().includes(this.destination.toLowerCase()) ||
          (property.place || '').toLowerCase().includes(this.destination.toLowerCase())
        : true;

      const matchesGuests = this.guests ? (property.guests || 0) >= this.guests : true;

      // Assuming availability fields exist; adjust if not
      const matchesDates = this.startDate && this.endDate
        ? (new Date(property.availableFrom) <= this.startDate && new Date(property.availableTo) >= this.endDate)
        : true;

      return matchesDestination && matchesGuests && matchesDates;
    });
  }

  filterByPlaceType(placeType: string) {
    if (!placeType) {
      this.getAllProperties(); // Reset to all properties
      return;
    }
    this.listingsService.getAllListings().subscribe(
      (res: any) => {
        const filteredData = res.filter((property: any) =>
          (property.placeType || '').toLowerCase() === placeType.toLowerCase()
        );
        this.properties = filteredData;
        console.log(`Filtered by ${placeType}:`, this.properties);
      },
      (error) => {
        console.error(`Error filtering by ${placeType}:`, error);
      }
    );
  }
}