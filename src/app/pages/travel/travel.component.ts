import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trips/trip.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


interface PropertyType {
  name: string;
  icon: string;
}
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent {
  trips: any[] = [];

  isMobile: boolean = false;



  propertyTypes: PropertyType[] = [
    { name: 'House', icon: 'home' },
    { name: 'Apartment', icon: 'apartment' },
    { name: 'Barn', icon: 'agriculture' },
    { name: 'Bed & breakfast', icon: 'restaurant' },
    { name: 'Boat', icon: 'sailing' },
    { name: 'Cabin', icon: 'cabin' },
    { name: 'Camper/RV', icon: 'rv_hookup' },
    { name: 'Casa particular', icon: 'home' },
    { name: 'Castle', icon: 'castle' },
    { name: 'Cave', icon: 'terrain' },
    { name: 'Container', icon: 'view_in_ar' },
    { name: 'Cycladic home', icon: 'home' },
    { name: 'Dammuso', icon: 'home_work' },
    { name: 'Dome', icon: 'lens' },
    { name: 'Earth home', icon: 'eco' },
    { name: 'Farm', icon: 'agriculture' },
    { name: 'Guesthouse', icon: 'home_work' },
    { name: 'Hotel', icon: 'hotel' },
    { name: 'Houseboat', icon: 'sailing' },
    { name: 'Kezhan', icon: 'home_work' },
    { name: 'Minsu', icon: 'home' },
    { name: 'Riad', icon: 'home_work' },
    { name: 'Ryokan', icon: 'hotel' },
    { name: 'Shepherd’s hut', icon: 'cabin' },
    { name: 'Tent', icon: 'tent' },
    { name: 'Tiny home', icon: 'home_mini' },
    { name: 'Tower', icon: 'apartment' },
    { name: 'Treehouse', icon: 'park' },
    { name: 'Trullo', icon: 'home_work' },
    { name: 'Windmill', icon: 'toys' },
    { name: 'Yurt', icon: 'tent' }
  ];
  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
   // nav: true,
   navText: ['<', '>'],
    responsive: {
      0: { items: 2 },
      576: { items: 4 },
      767: { items: 6 },
      992: { items: 8 }
    },
    autoWidth: false,
    margin: 10
  };

  constructor(private tripService: TripService , private router:Router) {

  
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripService.getAllTrips().subscribe(
      (res: any) => {
        this.trips = res;
        console.log("tripS loaded:", this.trips);
      },
      (error) => {
        console.error("Error fetching tripS:", error);
      }
    );
  }

  onSearchPerformed(queryParams: any) {
    console.log('Search performed with params:', queryParams);
  }

  myDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d != null && d >= today;
  };





  filterByPlaceType(place: string) {
    if (!place) {
      this.getAllTrips();
      return;
    }
    this.tripService.getAllTrips().subscribe(
      (res: any) => {
        const filteredData = res.filter((property: any) =>
          (property.place || '').toLowerCase() === place.toLowerCase()
        );
        this.trips = filteredData;
        console.log(`Filtered by ${place}:`, this.trips);
      },
      (error) => {
        console.error(`Error filtering by ${place}:`, error);
      }
    );
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Bootstrap's md breakpoint
  }
}
