// side-bar-filter-search.component.ts
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
