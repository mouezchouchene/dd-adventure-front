import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-property-owner',
  templateUrl: './property-owner.component.html',
  styleUrls: ['./property-owner.component.scss'],
})
export class PropertyOwnerComponent  {

  constructor(private router: Router , public authService: AuthenticationService) {}


}
