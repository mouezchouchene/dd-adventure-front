import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 


import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgAutoplay from 'lightgallery/plugins/autoplay';
//import lgShare from 'lightgallery/plugins/share';
//import lgDownload from 'lightgallery/plugins/download';
import LightGallery from 'lightgallery';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements AfterViewInit {
  property: any;
  propertyID!: string;
  reservations: any[] = []; 
  minCheckOutDate: Date | null = null;
  today: Date = new Date();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [], 
    validRange: {
      start: new Date() 
    },
    eventColor: '#8a2b89', 
    eventTextColor: '#ffffff'
  };

  @ViewChild('calendar') calendar: any; 

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private propertiesService: PropertiesListingsService,
    private authService: AuthenticationService,
    private snackbarService: SnackbarService

  ) {
    this.route.params.subscribe(params => {
      this.propertyID = params['id'];
      this.loadPropertyDetails();
      this.loadReservations(); 
    });

    this.initLightGallery();
  }

  ngAfterViewInit(): void {
    this.initLightGallery();
  }

  private loadPropertyDetails() {
    if (this.propertyID) {
      this.propertiesService.getPropertyById(this.propertyID).subscribe((data: any) => {
        this.property = data;
        console.log('property details =>', this.property);
      });
    }
  }

  private loadReservations() {
    if (this.propertyID) {
      this.propertiesService.getReservationsByPropertyId(this.propertyID).subscribe(
        (reservations: any[]) => {
          this.reservations = reservations;
          this.updateCalendarEvents(); 
        },
        error => {
          console.error('Error fetching reservations:', error);
        }
      );
    }
  }

  private updateCalendarEvents() {
    const events = this.reservations.map(reservation => ({
      title: 'Booked',
      start: reservation.checkInDate,
      end: reservation.checkOutDate,
      allDay: true
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
  }

  private initLightGallery(): void {
    const lightGallery = LightGallery(this.el.nativeElement.querySelector('#lightgallery'), {
      plugins: [lgZoom, lgThumbnail, lgFullscreen, lgAutoplay],
      speed: 500,
      thumbnail: true,
      zoom: true,
      fullScreen: true,
      autoplay: true,
      dynamic: false
    });
  }

  bookingForm!: FormGroup;

  ngOnInit() {
    this.bookingForm = new FormGroup({
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
      guests: new FormControl('',  Validators.min(1)),
      crib: new FormControl(false),
      pickUp: new FormControl(false),
      dropOff: new FormControl(false),
      concert: new FormControl(false)
    });


    // Listen for changes in checkIn date
    this.bookingForm.get('checkIn')?.valueChanges.subscribe(checkInDate => {
      if (checkInDate) {
        this.minCheckOutDate = new Date(checkInDate);

        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        this.bookingForm.get('checkOut')?.setValue(nextDay);
      } else {
        this.minCheckOutDate = null;
        this.bookingForm.get('checkOut')?.setValue(null);
      }
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const token = this.authService.getToken();
      if (!token) {
        this.snackbarService.open('You must be logged in to make a reservation!', '', 5000);

        return;
      }

      const formValue = this.bookingForm.value;

      const checkInDate = this.formatDate(formValue.checkIn);
      const checkOutDate = this.formatDate(formValue.checkOut);

      const reservationData = {
        propertyId: this.propertyID,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: formValue.guests,
        crib: formValue.crib,
        pickUp: formValue.pickUp,
        dropOff: formValue.dropOff,
        concert: formValue.concert
      };

      this.propertiesService.createReservation(reservationData).subscribe(
        response => {
          console.log('Reservation created successfully:', response);
          this.snackbarService.open('Reservation created successfully!', '', 5000);

          this.loadReservations();
          this.bookingForm.reset();
        },
        error => {
          console.error('Error creating reservation:', error);
          this.snackbarService.open('Failed to create reservation. Please try again !', '', 5000);
        }
      );
    }
  }


  private formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
