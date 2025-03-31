import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { DateService } from 'src/app/services/date.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


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
    private dateService: DateService,
    private snackbarService: SnackbarService,

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
      this.endDate = today;
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
    const urlParams = new URLSearchParams(window.location.search);
    const storedSearch = localStorage.getItem('searchParams');
    const localStorageParams = storedSearch ? JSON.parse(storedSearch) : {};

    const defaults = {
      streetAddress: '',
      city: '',
      country: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
      guests: 0,
      adults: 1,
      children: 0,
      rooms: 1,
      pets: false
    };

    this.destination = urlParams.get('streetAddress') || localStorageParams.streetAddress || defaults.streetAddress;

    this.selectedDestination = this.destination
      ? {
          streetAddress: this.destination,
          city: urlParams.get('city') || localStorageParams.city || defaults.city,
          country: urlParams.get('country') || localStorageParams.country || defaults.country
        }
      : null;

    this.startDate = urlParams.get('startDate')
      ? this.dateService.parseLocalDate(urlParams.get('startDate')!)
      : localStorageParams.startDate
      ? this.dateService.parseLocalDate(localStorageParams.startDate)
      : defaults.startDate;

    this.endDate = urlParams.get('endDate')
      ? this.dateService.parseLocalDate(urlParams.get('endDate')!)
      : localStorageParams.endDate
      ? this.dateService.parseLocalDate(localStorageParams.endDate)
      : defaults.endDate;

    this.guests = parseInt(urlParams.get('guests') || localStorageParams.guests || defaults.guests.toString(), 10);
    this.adults = parseInt(urlParams.get('adults') || localStorageParams.adults || defaults.adults.toString(), 10);
    this.children = parseInt(urlParams.get('children') || localStorageParams.children || defaults.children.toString(), 10);
    this.rooms = parseInt(urlParams.get('rooms') || localStorageParams.rooms || defaults.rooms.toString(), 10);
    this.pets = (urlParams.get('pets') || localStorageParams.pets || defaults.pets.toString()) === 'true';

    this.searchControl.setValue(this.destination);
    if (this.destination) {
      this.destinationSelected = true;
    }
  }

  getAllProperties() {
    this.listingsService.getAllListings().subscribe(
      (res: any) => {
        this.properties = res;
        console.log('Properties loaded:', this.properties);
      },
      (error) => {
        console.error('Error fetching properties:', error);
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
    return selected > start;
  };

  updateEndDate() {
    if (this.startDate) {
      this.startDate = this.dateService.normalizeDate(this.startDate);
      if (!this.endDate || this.endDate <= this.startDate) {
        this.endDate = this.startDate;
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
  }

  onSearch(): void {


    if (!this.destination || !this.selectedDestination) {
      console.log('Destination is required.');
      this.snackbarService.open('Destination is required !', '', 5000);
      return;
    }

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