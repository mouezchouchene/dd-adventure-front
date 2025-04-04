import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-filter-search',
  templateUrl: './side-bar-filter-search.component.html',
  styleUrls: ['./side-bar-filter-search.component.scss']
})
export class SideBarFilterSearchComponent {
  @Output() filtersApplied = new EventEmitter<any>();
  @Output() filtersCleared = new EventEmitter<void>();

  minPrice: number = 0;
  maxPrice: number = 1000; 
  sliderMin: number = 0;
  sliderMax: number = 1000;

  filters = {
    facilities: {
      pool: false,
      wifi: false,
      parking: false,
      airConditioning: false
    },
    propertyType: {
      apartment: false,
      hotel: false,
      villa: false,
      hostel: false
    },
    guestRating: 'any'
  };

  // Method to update maxPrice based on properties
  setMaxPriceFromProperties(properties: any[]) {
    if (properties && properties.length > 0) {
      this.minPrice = Math.min(...properties.map(p => p.price || 0));
      this.sliderMin = this.minPrice;

      this.maxPrice = Math.max(...properties.map(p => p.price || 0));
      this.sliderMax = this.maxPrice;
    } else {
      this.maxPrice = 0; 
      this.sliderMax = 0;
    }
  }

  // Method 1: Collects filter data and emits it
  applyFilters() {
    const filterData = {
      priceRange: {
        min: this.minPrice,
        max: this.maxPrice
      },
      facilities: { ...this.filters.facilities },
      propertyType: { ...this.filters.propertyType },
      guestRating: this.filters.guestRating
    };
    this.filtersApplied.emit(filterData);
  }

  // Method 2: Resets filter values and emits clear event
  clearFilters() {
    this.minPrice = this.sliderMin;
    this.maxPrice = this.sliderMax;
    this.filters = {
      facilities: {
        pool: false,
        wifi: false,
        parking: false,
        airConditioning: false
      },
      propertyType: {
        apartment: false,
        hotel: false,
        villa: false,
        hostel: false
      },
      guestRating: 'any'
    };
    this.filtersCleared.emit();
  }
}