import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';


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


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements AfterViewInit {

  property:any;
propertyID!:string;



  constructor(private el: ElementRef , private route:ActivatedRoute , private propertiesService:PropertiesListingsService) {

    this.route.params.subscribe(params =>{
      this.propertyID = params['id'];
      this.loadPropertyDetails();
    })

    this.initLightGallery();
  }

  ngAfterViewInit(): void {
    this.initLightGallery();
  }

  private loadPropertyDetails() {
    if(this.propertyID)
    {
       this.propertiesService.getPropertyById(this.propertyID).subscribe((data: any) => {
          this.property = data;
          console.log('property details =>',this.property);
        });
    }
  }

  private initLightGallery(): void {
    const lightGallery = LightGallery(this.el.nativeElement.querySelector('#lightgallery'), {
      plugins: [lgZoom, lgThumbnail, lgFullscreen, lgAutoplay], 
      speed: 500, 
      thumbnail: true, 
      zoom: true, 
      fullScreen: true, 
      autoplay: true, 
      dynamic: false, 
    });
}

 


  leftCalendarDate: Date = new Date(2024, 7); 
  rightCalendarDate: Date = new Date(2024, 8); 

  onLeftCalendarMonthChange(offset: number): void {
    this.leftCalendarDate = new Date(this.leftCalendarDate.getFullYear(), this.leftCalendarDate.getMonth() + offset, 1);
    this.rightCalendarDate = new Date(this.leftCalendarDate.getFullYear(), this.leftCalendarDate.getMonth() + 1, 1);
  }

  onRightCalendarMonthChange(offset: number): void {
    this.rightCalendarDate = new Date(this.rightCalendarDate.getFullYear(), this.rightCalendarDate.getMonth() + offset, 1);
    this.leftCalendarDate = new Date(this.rightCalendarDate.getFullYear(), this.rightCalendarDate.getMonth() - 1, 1);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const today = new Date();

    if (view === 'month') {
      if (cellDate < today) {
        return 'past';
      } else if (cellDate.toDateString() === today.toDateString()) {
        return 'today';
      } else if (this.isBooked(cellDate)) {
        return 'booked';
      }
    }

    return '';
  };

  isBooked(date: Date): boolean {
    return date.getDay() === 0; 
  }

  getMonthYearString(date: Date): string {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }


  bookingForm!: FormGroup;

  ngOnInit() {
    this.bookingForm = new FormGroup({
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
      guests: new FormControl('', [Validators.required, Validators.min(1)]),
      crib: new FormControl(false),
      pickUp: new FormControl(false),
      dropOff: new FormControl(false),
      concert: new FormControl(false)
    });
  }



 
  




}
