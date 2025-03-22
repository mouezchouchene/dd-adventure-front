import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { DateService } from 'src/app/services/date.service';

interface Destination {
  streetAddress: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchPerformed = new EventEmitter<any>();

  properties: any[] = [];
  searchControl = new FormControl('');
  destination: string = '';
  selectedDestination: Destination | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  guests: number = 0;
  filteredDestinations: Destination[] = [];
  destinationSelected: boolean = false;
  isGuestsModalOpen: boolean = false;
  adults: number = 1;
  children: number = 0;
  rooms: number = 1;
  pets: boolean = false;

  constructor(
    private listingsService: PropertiesListingsService,
    private router: Router,
    private dateService: DateService // Inject DateService
  ) {}

  ngOnInit() {
    this.loadSearchValuesFromStorage();
    this.initializeDefaults();
    this.setupSubscriptions();
    this.getAllProperties();

    if (this.searchControl.value) {
      this.filterDestinations(this.searchControl.value);
    }
  }

  private initializeDefaults() {
    const today = this.dateService.getLocalDate();
    if (!this.startDate) {
      this.startDate = today;
    }
    if (!this.endDate) {
      this.endDate = today; // No automatic +1
    }
    this.guests = this.adults + this.children;
  }

  private setupSubscriptions() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filterDestinations(value);
      this.destinationSelected = false;
    });
  }

  private loadSearchValuesFromStorage() {
    const storedSearch = localStorage.getItem('searchParams');
    if (storedSearch) {
      const params = JSON.parse(storedSearch);
      this.destination = params.streetAddress || '';
      this.selectedDestination = params.streetAddress
        ? { streetAddress: params.streetAddress, city: params.city || '', country: params.country || '' }
        : null;
      this.startDate = params.startDate ? this.dateService.parseLocalDate(params.startDate) : null;
      this.endDate = params.endDate ? this.dateService.parseLocalDate(params.endDate) : null;
      this.guests = parseInt(params.guests, 10) || 0;
      this.adults = parseInt(params.adults, 10) || 1;
      this.children = parseInt(params.children, 10) || 0;
      this.rooms = parseInt(params.rooms, 10) || 1;
      this.pets = params.pets === 'true';
      this.searchControl.setValue(this.destination);

      if (this.destination) {
        this.destinationSelected = true;
      }
    }
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

  myDateFilter = (d: Date | null): boolean => {
    const today = this.dateService.getLocalDate();
    return d != null && this.dateService.isDateGreaterOrEqual(d, today);
  };

  endDateFilter = (d: Date | null): boolean => {
    if (!d || !this.startDate) return false;
    const start = this.dateService.normalizeDate(this.startDate);
    const selected = this.dateService.normalizeDate(d);
    return selected > start; // Ensure endDate is after startDate
  };

  updateEndDate() {
    if (this.startDate) {
      this.startDate = this.dateService.normalizeDate(this.startDate);
      if (!this.endDate || this.endDate <= this.startDate) {
        this.endDate = this.startDate; // Default to same day
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
    if (this.startDate) this.startDate = this.dateService.normalizeDate(this.startDate);
    if (this.endDate) this.endDate = this.dateService.normalizeDate(this.endDate);

    const queryParams = {
      streetAddress: this.destination || '',
      city: this.selectedDestination?.city || '',
      country: this.selectedDestination?.country || '',
      startDate: this.startDate ? this.dateService.formatLocalDate(this.startDate) : '',
      endDate: this.endDate ? this.dateService.formatLocalDate(this.endDate) : '',
      guests: this.guests.toString(),
      adults: this.adults.toString(),
      children: this.children.toString(),
      rooms: this.rooms.toString(),
      pets: this.pets.toString()
    };

    localStorage.setItem('searchParams', JSON.stringify(queryParams));

    this.filteredDestinations = [];
    if (this.destination) {
      this.destinationSelected = true;
    }

    console.log('Query Params:', queryParams);
    this.searchPerformed.emit(queryParams);
    this.router.navigate(['/search'], { queryParams });
  }
}