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

  
}
