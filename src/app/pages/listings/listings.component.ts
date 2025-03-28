import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { ActivatedRoute } from '@angular/router';
import { SideBarFilterSearchComponent } from 'src/app/shared/components/side-bar-filter-search/side-bar-filter-search.component';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  @ViewChild(SideBarFilterSearchComponent) filterComponent!: SideBarFilterSearchComponent;

  properties: any[] = [];
  filteredProperties: any[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  selectedSort: string = 'price-asc';
  sortOptions = [
    { value: 'price-asc', viewValue: 'Price: Low to High' },
    { value: 'price-desc', viewValue: 'Price: High to Low' },
    { value: 'rating-desc', viewValue: 'Rating: High to Low' }
  ];

  constructor(
    private listingsService: PropertiesListingsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onSearchPerformed({});
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.onSearchPerformed(params);
      }
    });
  }

  onSearchPerformed(searchParams: any) {
    const params = searchParams || {};
    
    this.listingsService.searchProperties(params).subscribe(
      (res: any) => {
        this.properties = res;
        this.filteredProperties = [...this.properties];
        // Update maxPrice in filter component without applying filters
        if (this.filterComponent) {
          this.filterComponent.setMaxPriceFromProperties(this.filteredProperties);
        }
        this.applySort();
        console.log('Properties loaded from search:', this.filteredProperties);
      },
      (error) => {
        console.error('Error searching properties:', error);
        this.filteredProperties = [];
        this.properties = [];
        if (this.filterComponent) {
          this.filterComponent.setMaxPriceFromProperties([]); // Reset to default on error
        }
      }
    );
  }

  applyFilters(filterData: any) {
    this.filteredProperties = this.properties.filter(property => {
      const priceInRange = property.price >= filterData.priceRange.min && property.price <= filterData.priceRange.max;
      const hasPool = !filterData.facilities.pool || property.pool;
      const hasWifi = !filterData.facilities.wifi || property.wifi;
      const hasParking = !filterData.facilities.parking || property.freeParking;
      const hasAC = !filterData.facilities.airConditioning || property.airConditioning;
      const typeMatch =
        !Object.values(filterData.propertyType).some((v) => v) ||
        (filterData.propertyType.apartment && property.placeType === 'Apartments') ||
        (filterData.propertyType.hotel && property.placeType === 'Hotel') ||
        (filterData.propertyType.villa && property.placeType === 'Villa') ||
        (filterData.propertyType.hostel && property.placeType === 'Hostel');
      const ratingMatch = filterData.guestRating === 'any' || (property.rating >= parseInt(filterData.guestRating));

      return priceInRange && hasPool && hasWifi && hasParking && hasAC && typeMatch && ratingMatch;
    });
    this.applySort();
  }

  clearFilters() {
    this.filteredProperties = [...this.properties];
    this.applySort();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  onSortChange() {
    this.applySort();
  }

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