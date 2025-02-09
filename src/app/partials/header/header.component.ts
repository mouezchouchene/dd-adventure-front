import { Component, HostListener ,ViewChild, ElementRef, AfterViewInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalHostComponent } from 'src/app/shared/components/modal-host/modal-host.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;

  isSticky: boolean = false;
  navbarOffsetTop: number = 0;
  @ViewChild('navbar') navbar!: ElementRef;

  @ViewChild('loginDialog', { static: false }) loginDialog!: ElementRef;
  @ViewChild('signupDialog', { static: false }) signupDialog!: ElementRef;

  constructor(private elementRef: ElementRef , private dialog:MatDialog , 
    private injector: Injector,
    public authService: AuthenticationService
  
  ) {}



  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= this.navbarOffsetTop;
  }


  openLoginDialog():void{
    this.dialog.open(LoginComponent, {  
      width: '600px',
      height: "800px",
      data: { title: 'Login'} 
    })
  }


  openSingupDialog(){
    this.dialog.open(SignupComponent,{

      width: '600px',
      height: "800px",
      data: { title: 'Signup', Component:SignupComponent}
    })
  }



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // getDropdownMenuItems() {
  //   const role = this.authService.getUserRole();
  //   if (role === 'property-owner') {
  //     return [
  //       { link: '/property-owner/dashboard', icon: 'fa-tachometer', label: 'Dashboard' },
  //       { link: '/property-owner/my-profile', icon: 'fa-user', label: 'My Profile' },
  //       { link: '/property-owner/my-listings', icon: 'fa-map-marker', label: 'My Listings' },
  //       { link: '/property-owner/add-new-listing', icon: 'fa-calendar', label: 'Add New Listing' },
  //       { link: '/property-owner/favorites', icon: 'fa-heart', label: 'Favorites' },
  //       { link: '/property-owner/my-reservations', icon: 'fa-folder-open', label: 'Reservations' },
  //       { link: '/property-owner/my-bookings', icon: 'fa-folder-open', label: 'Bookings' },
  //       { link: '/property-owner/my-reviews', icon: 'fa-bar-chart', label: 'My Reviews' },
  //       { link: '/logout', icon: 'fa-sign-out', label: 'Log Out' },
  //     ];
  //   } else if (role === 'booking-property') {
  //     return [
  //       { link: '/booking-property/my-profile', icon: 'fa-user', label: 'My Profile' },
  //       { link: '/booking-property/favorites', icon: 'fa-heart', label: 'Favorites' },
  //       { link: '/booking-property/my-reservations', icon: 'fa-folder-open', label: 'Reservations' },
  //       { link: '/booking-property/my-inbox', icon: 'fa-bar-chart', label: 'My Inbox' },
  //       { link: '/logout', icon: 'fa-sign-out', label: 'Log Out' },
  //     ];
  //   }
  //   return [];
  // }

}
