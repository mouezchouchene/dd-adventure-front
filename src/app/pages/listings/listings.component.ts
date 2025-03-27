import { Component, OnInit } from '@angular/core';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  properties: any[] = []; // Original properties list
  filteredProperties: any[] = []; // Filtered properties list
  viewMode: 'grid' | 'list' = 'grid'; // Default view mode
  selectedSort: string = 'price-asc'; // Default sort option
  sortOptions = [
    { value: 'price-asc', viewValue: 'Price: Low to High' },
    { value: 'price-desc', viewValue: 'Price: High to Low' },
    { value: 'rating-desc', viewValue: 'Rating: High to Low' }
  ];

  constructor(private listingsService: PropertiesListingsService) {}

  ngOnInit() {
    this.getAllProperties();
  }

  getAllProperties() {
    this.listingsService.getAllListings().subscribe(
      (res: any) => {
        this.properties = res;
        this.filteredProperties = [...this.properties]; // Initialize filtered list
        console.log('Properties loaded:', this.properties);
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  // Handle search event from SearchBarComponent
  onSearchPerformed(searchParams: any) {
    this.filteredProperties = this.properties.filter(property => {
      const matchesDestination = !searchParams.streetAddress ||
        property.streetAddress?.toLowerCase().includes(searchParams.streetAddress.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchParams.streetAddress.toLowerCase()) ||
        property.country?.toLowerCase().includes(searchParams.streetAddress.toLowerCase());

      const matchesDates = (!searchParams.startDate ||
        new Date(property.availableFrom) <= new Date(searchParams.startDate)) &&
        (!searchParams.endDate ||
        new Date(property.availableTo) >= new Date(searchParams.endDate));

      const matchesGuests = property.maxGuests >= parseInt(searchParams.guests) || !searchParams.guests;

      return matchesDestination && matchesDates && matchesGuests;
    });
    this.applySort(); // Apply sorting after filtering
  }

  // Handle filter event from SideBarFilterSearchComponent
  applyFilters(filterData: any) {
    this.filteredProperties = this.properties.filter(property => {
      // Price filter
      const priceInRange = property.price >= filterData.priceRange.min &&
                          property.price <= filterData.priceRange.max;

      // Facilities filter
      const hasPool = !filterData.facilities.pool || property.facilities?.pool;
      const hasWifi = !filterData.facilities.wifi || property.facilities?.wifi;
      const hasParking = !filterData.facilities.parking || property.facilities?.parking;
      const hasAC = !filterData.facilities.airConditioning || property.facilities?.airConditioning;

      // Property type filter
      const typeMatch = !Object.values(filterData.propertyType).some(v => v) || // If no type selected, match all
                       (filterData.propertyType.apartment && property.type === 'apartment') ||
                       (filterData.propertyType.hotel && property.type === 'hotel') ||
                       (filterData.propertyType.villa && property.type === 'villa') ||
                       (filterData.propertyType.hostel && property.type === 'hostel');

      // Guest rating filter
      const ratingMatch = filterData.guestRating === 'any' ||
                         (property.rating >= parseInt(filterData.guestRating));

      return priceInRange && hasPool && hasWifi && hasParking && hasAC &&
             typeMatch && ratingMatch;
    });
    this.applySort(); // Apply sorting after filtering
  }

  // Reset filters
  clearFilters() {
    this.filteredProperties = [...this.properties];
    this.applySort(); // Apply sorting after clearing filters
  }

  // Set view mode (grid or list)
  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  // Handle sort change
  onSortChange() {
    this.applySort();
  }

  // Apply sorting based on selectedSort
  applySort() {
    this.filteredProperties = [...this.filteredProperties].sort((a, b) => {
      switch (this.selectedSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }
}
