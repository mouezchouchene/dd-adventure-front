import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { ModalHostComponent } from 'src/app/shared/components/modal-host/modal-host.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  hide = true;
  error = ""
  currentComponent:any = SignupComponent; 

  constructor(private fb: FormBuilder ,private authService: AuthenticationService,
    private router: Router , private dialog : MatDialog) {


    this.authService.logout();
    }

  ngOnInit(): void {
    
  }

  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['',Validators.required],
    accountType: ['book'],
    termsAndConditions: [false , Validators.required]
  });

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.login(this.signupForm.value)
        .then((user) => {
          console.log('Login successful:', user);
          this.router.navigate(['/property-owner']); 
          this.dialog.closeAll();
        })
        .catch((error) => {
          console.log("failed login =>" +error);
      this.error = "Invalid username or password"
          
      
          
        });
    }
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  onSignUp(): void {
    
  }

  onForgotPassword(): void {}



  openLoginDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '600px',
      height: '800px',
      data: { title: 'Login', component: LoginComponent } 
    });
  }

 

}
