import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  profileImageUrl: string = '/assets/images/avatar.png';
  idScanUrl: string = '/assets/images/avatar.png';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\+?\d{10,15}$/)],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      website: ['', Validators.pattern(/https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)],
      aboutMe: [''],
      skype: [''],
      facebookUrl: ['', Validators.pattern(/https?:\/\/(www\.)?facebook.com\/[A-Za-z0-9_.-]+/)],
      linkedinUrl: ['', Validators.pattern(/https?:\/\/(www\.)?linkedin.com\/in\/[A-Za-z0-9_.-]+/)],
      twitterUrl: ['', Validators.pattern(/https?:\/\/(www\.)?twitter.com\/[A-Za-z0-9_.-]+/)],
      instagramUrl: ['', Validators.pattern(/https?:\/\/(www\.)?instagram.com\/[A-Za-z0-9_.-]+/)],
      githubUrl: ['', Validators.pattern(/https?:\/\/(www\.)?github.com\/[A-Za-z0-9_.-]+/)]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      
    }
  }

  toggleHideOld(): void {
    this.hideOld = !this.hideOld;
  }

  toggleHideNew(): void {
    this.hideNew = !this.hideNew;
  }

  toggleHideConfirm(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  passwordMatchValidator(group: FormGroup) {
    let password = group.get('newPassword')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }


  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.profileImageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onIdScanUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.idScanUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

}
