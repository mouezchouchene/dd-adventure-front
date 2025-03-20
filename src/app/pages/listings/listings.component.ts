import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  properties: any[] = [];

  constructor(
    private listingsService: PropertiesListingsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllProperties();
  }

  getAllProperties() {
    this.listingsService.getAllListings().subscribe(
      (res: any) => {
        this.properties = res;
        console.log("Properties loaded:", this.properties);

        this.route.queryParams.subscribe(params => {
          const streetAddress = params['streetAddress']?.toLowerCase();
          const city = params['city']?.toLowerCase();
          const country = params['country']?.toLowerCase();
          const startDate = params['startDate'] ? new Date(params['startDate']) : null;
          const endDate = params['endDate'] ? new Date(params['endDate']) : null;
          const guests = parseInt(params['guests'], 10) || 0;
          const rooms = parseInt(params['rooms'], 10) || 0;
          const pets = params['pets'] === 'true';

          console.log('Query Params:', { streetAddress, city, country, startDate, endDate, guests, rooms, pets });

          this.properties = this.filterProperties(
            this.properties,
            streetAddress,
            city,
            country,
            startDate,
            endDate,
            guests,
            rooms,
            pets
          );

          console.log('Filtered Properties:', this.properties);
        });
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  private filterProperties(
    properties: any[],
    streetAddress: string | undefined,
    city: string | undefined,
    country: string | undefined,
    startDate: Date | null,
    endDate: Date | null,
    guests: number,
    rooms: number,
    pets: boolean
  ): any[] {
    return properties.filter(property => {
      const matchesStreetAddress = streetAddress
        ? (property.streetAddress || '').toLowerCase().includes(streetAddress)
        : true;

      const matchesCity = city
        ? (property.city || '').toLowerCase().includes(city)
        : true;

      const matchesCountry = country
        ? (property.country || '').toLowerCase().includes(country)
        : true;

      const matchesGuests = guests > 0
        ? (property.guests || 0) >= guests
        : true;

      const matchesRooms = rooms > 0
        ? (property.bedrooms || 0) >= rooms
        : true;

      const matchesPets = pets
        ? property.petsAllowed === true 
        : true;

      const matchesDates = startDate && endDate
        ? (new Date(property.availableFrom) <= startDate && new Date(property.availableTo) >= endDate)
        : true;

      // return (
      //   matchesStreetAddress &&
      //   matchesCity &&
      //   matchesCountry &&
      //   matchesGuests &&
      //   matchesRooms &&
      //   matchesPets &&
      //   matchesDates
      // );
      return (
        matchesStreetAddress ||
        matchesCity ||
        matchesCountry ||
        matchesGuests ||
        matchesRooms ||
        matchesPets ||
        matchesDates
      );
    });
  }
}