import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  error = ""


  constructor(private fb: FormBuilder ,private authService: AuthenticationService,
    private router: Router , private dialog : MatDialog) {


    this.authService.logout();
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
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

  openSingupDialog(){
    this.dialog.closeAll();
    this.dialog.open(SignupComponent,{

      width: '600px',
      height: "800px",
      data: { title: 'Signup', Component:SignupComponent}
    })
  }
    
}
