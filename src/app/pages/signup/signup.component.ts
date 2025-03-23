import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true;
  error = "";
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,

  ) {
    this.authService.logout();
  }

  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], 
    phoneNumber: ['', Validators.required],
    accountType: ['book', Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });



  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.error = '';
      
      const formValue = this.signupForm.value;
      const registerData = {
        username: formValue.username!,
        password: formValue.password!,
        roleId: formValue.accountType === 'book' ? 3 : 2,
        email: formValue.email!,
        phoneNumber: formValue.phoneNumber!
      };

      this.authService.register(registerData)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.snackbarService.open('Registration successful', '', 5000);
            this.openLoginDialog();
            this.signupForm.reset();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Registration failed:', error);
            this.error = error.message || "Registration failed. Please try again.";
            this.isLoading = false;
          }
        });
    }
  }







  toggleHide(): void {
    this.hide = !this.hide;
  }

  openLoginDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '600px',
      height: '800px',
      data: { title: 'Login', component: LoginComponent }
    });
  }
}