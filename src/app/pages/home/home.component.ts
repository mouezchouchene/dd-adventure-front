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
  guests: number = 0; // Updated to number instead of number | null
  filteredDestinations: Destination[] = [];
  destinationSelected: boolean = false;
  isGuestsModalOpen: boolean = false; // added flag for guest modal
  adults: number = 1;
  children: number = 0;
  rooms: number = 1;
  pets: boolean = false;


  // Properties array
  // properties = [
  //     // Tunisia Locations
  //   {
  //     image: 'path/to/image1.jpg',
  //     title: 'Hammamet Beach Villa',
  //     type: 'Villa • Entire home',
  //     details: '6 Guests • 4 Bedrooms • 3 Bathrooms',
  //     guests: 6,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     price: 150,
  //     location: 'Hammamet',
  //     country: 'Tunisia',
  //     address: 'Rue de la Plage, 8050 Hammamet, Tunisia',
  //     availableFrom: new Date('2023-11-15'),
  //     availableTo: new Date('2023-12-15')
  //   },
  //   {
  //     image: 'path/to/image2.jpg',
  //     title: 'Sousse Medina Apartment',
  //     type: 'Apartment • Entire home',
  //     details: '4 Guests • 2 Bedrooms • 2 Bathrooms',
  //     guests: 4,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     price: 90,
  //     location: 'Sousse',
  //     country: 'Tunisia',
  //     address: 'Rue de la Kasbah, 4000 Sousse, Tunisia',
  //     availableFrom: new Date('2023-12-01'),
  //     availableTo: new Date('2024-01-01')
  //   },
  //   {
  //     image: 'path/to/image3.jpg',
  //     title: 'Djerba Island Retreat',
  //     type: 'Bungalow • Entire home',
  //     details: '2 Guests • 1 Bedroom • 1 Bathroom',
  //     guests: 2,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     price: 80,
  //     location: 'Djerba',
  //     country: 'Tunisia',
  //     address: 'Zone Touristique, 4180 Djerba, Tunisia',
  //     availableFrom: new Date('2023-11-20'),
  //     availableTo: new Date('2023-12-20')
  //   },
  //   {
  //     image: 'path/to/image4.jpg',
  //     title: 'Tunis City Center Studio',
  //     type: 'Studio • Entire home',
  //     details: '2 Guests • 1 Bedroom • 1 Bathroom',
  //     guests: 2,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     price: 70,
  //     location: 'Tunis',
  //     country: 'Tunisia',
  //     address: 'Avenue Habib Bourguiba, 1000 Tunis, Tunisia',
  //     availableFrom: new Date('2023-12-05'),
  //     availableTo: new Date('2024-01-05')
  //   },
  //   // Italy Locations
  //   {
  //     image: 'path/to/image5.jpg',
  //     title: 'Rome Colosseum Apartment',
  //     type: 'Apartment • Entire home',
  //     details: '4 Guests • 2 Bedrooms • 2 Bathrooms',
  //     guests: 4,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     price: 180,
  //     location: 'Rome',
  //     country: 'Italy',
  //     address: 'Via del Colosseo, 00184 Rome, Italy',
  //     availableFrom: new Date('2023-11-10'),
  //     availableTo: new Date('2023-12-10')
  //   },
  //   {
  //     image: 'path/to/image6.jpg',
  //     title: 'Florence Tuscan Villa',
  //     type: 'Villa • Entire home',
  //     details: '8 Guests • 5 Bedrooms • 4 Bathrooms',
  //     guests: 8,
  //     bedrooms: 5,
  //     bathrooms: 4,
  //     price: 250,
  //     location: 'Florence',
  //     country: 'Italy',
  //     address: 'Via Bolognese, 50139 Florence, Italy',
  //     availableFrom: new Date('2023-12-01'),
  //     availableTo: new Date('2024-01-01')
  //   },
  //   {
  //     image: 'path/to/image7.jpg',
  //     title: 'Venice Canal View Studio',
  //     type: 'Studio • Entire home',
  //     details: '2 Guests • 1 Bedroom • 1 Bathroom',
  //     guests: 2,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     price: 120,
  //     location: 'Venice',
  //     country: 'Italy',
  //     address: 'Sestiere San Marco, 30124 Venice, Italy',
  //     availableFrom: new Date('2023-12-05'),
  //     availableTo: new Date('2024-01-05')
  //   },
  //   {
  //     image: 'path/to/image8.jpg',
  //     title: 'Milan Fashion District Loft',
  //     type: 'Loft • Entire home',
  //     details: '3 Guests • 2 Bedrooms • 1 Bathroom',
  //     guests: 3,
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     price: 160,
  //     location: 'Milan',
  //     country: 'Italy',
  //     address: 'Via Montenapoleone, 20121 Milan, Italy',
  //     availableFrom: new Date('2023-11-15'),
  //     availableTo: new Date('2023-12-15')
  //   },
  //   // Philippines Locations
  //   {
  //     image: 'path/to/image9.jpg',
  //     title: 'Boracay Beachfront Cottage',
  //     type: 'Cottage • Entire home',
  //     details: '4 Guests • 2 Bedrooms • 2 Bathrooms',
  //     guests: 4,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     price: 130,
  //     location: 'Boracay',
  //     country: 'Philippines',
  //     address: 'White Beach, Boracay Island, 5608 Aklan, Philippines',
  //     availableFrom: new Date('2023-11-25'),
  //     availableTo: new Date('2023-12-25')
  //   },
  //   {
  //     image: 'path/to/image10.jpg',
  //     title: 'Cebu City Condo',
  //     type: 'Condo • Entire home',
  //     details: '3 Guests • 1 Bedroom • 1 Bathroom',
  //     guests: 3,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     price: 70,
  //     location: 'Cebu',
  //     country: 'Philippines',
  //     address: 'Mango Avenue, Cebu City, 6000 Cebu, Philippines',
  //     availableFrom: new Date('2023-12-05'),
  //     availableTo: new Date('2024-01-05')
  //   },
  //   {
  //     image: 'path/to/image11.jpg',
  //     title: 'Palawan Island Villa',
  //     type: 'Villa • Entire home',
  //     details: '6 Guests • 3 Bedrooms • 3 Bathrooms',
  //     guests: 6,
  //     bedrooms: 3,
  //     bathrooms: 3,
  //     price: 200,
  //     location: 'Palawan',
  //     country: 'Philippines',
  //     address: 'El Nido, Palawan Island, 5313 Palawan, Philippines',
  //     availableFrom: new Date('2023-12-10'),
  //     availableTo: new Date('2024-01-10')
  //   },
  //   {
  //     image: 'path/to/image12.jpg',
  //     title: 'Manila City Apartment',
  //     type: 'Apartment • Entire home',
  //     details: '2 Guests • 1 Bedroom • 1 Bathroom',
  //     guests: 2,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     price: 80,
  //     location: 'Manila',
  //     country: 'Philippines',
  //     address: 'Makati Avenue, Makati, 1200 Metro Manila, Philippines',
  //     availableFrom: new Date('2023-11-20'),
  //     availableTo: new Date('2023-12-20')
  //   }
  // ];

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