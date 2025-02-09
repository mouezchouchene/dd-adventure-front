import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-booking-property',
  templateUrl: './booking-property.component.html',
  styleUrls: ['./booking-property.component.scss']
})
export class BookingPropertyComponent {


  constructor(private router: Router , public authService: AuthenticationService) {}




  
}
