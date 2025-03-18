import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

interface Destination {
  name: string;
  country: string;
  address: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  properties :any[]=[];

  searchControl = new FormControl('');
  destination: string = '';
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


  constructor(private listingsService:PropertiesListingsService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filterDestinations(value);
      this.destinationSelected = false;
    });

    this.getAllProperties()
  }
  ngOnInit(): void {
    this.properties
  }


  getAllProperties() {
    this.listingsService.getAllListings().subscribe((res: any) => {
      this.properties = res;
      console.log("properties =>", this.properties); 

     // this.properties.forEach(property => console.log("images for each property => " ,property.iamges)); 
    });
  }



  myDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d != null && d >= today;
  };

  filterDestinations(searchString: string | null) {
    if (!searchString) {
      this.filteredDestinations = [];
      return;
    }

    const lowerCaseSearch = searchString.toLowerCase();
    this.filteredDestinations = this.properties
      .filter(property =>
        property.location.toLowerCase().includes(lowerCaseSearch)
      )
      .map(property => ({ name: property.location, country: property.country, address: property.address }));
  }

  selectDestination(destination: Destination) {
    this.searchControl.setValue(destination.name);
    this.destination = destination.name;
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


  // Method to handle search button click
  onSearch(): void {
    console.log('Search button clicked');
    console.log('Destination:', this.destination);
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
    console.log('Guests:', this.guests);

    // Perform filtering and log the results
    const filteredProperties = this.performSearch();
    console.log('Filtered Properties:', filteredProperties);
  }

  // Method to filter properties based on search criteria
  private performSearch(): any[] {
    return this.properties.filter(property => {
      // Filter by destination (case-insensitive, optional)
      const matchesDestination = this.destination
        ? property.location.toLowerCase().includes(this.destination.toLowerCase())
        : true;

      // Filter by guests (optional)
      const matchesGuests = this.guests
        ? property.guests >= this.guests
        : true;

      // Filter by availability (optional)
      const matchesDates = this.startDate && this.endDate
        ? this.startDate >= property.availableFrom && this.endDate <= property.availableTo
        : true;

      // Return true only if all provided conditions are met
      return matchesDestination && matchesGuests && matchesDates;
    });
  }

  filterByPlaceType(placeType: string) {
    if (!placeType) {
          this.getAllProperties(); // Reset to all properties
          return;
      }
      this.listingsService.getAllListings().subscribe((res: any) => {
             const filteredData = res.filter((property: any) =>
                property.placeType?.toLowerCase() === placeType.toLowerCase()
             );
            this.properties = filteredData;
      });
}


}