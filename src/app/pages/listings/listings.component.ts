import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent {



  loginForm!: FormGroup;

  hide = true; // for password visibility toggle
  constructor(private fb: FormBuilder) {}

  ngOnInit()
  {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }



  selectedSize="";
  sizes = [
    { value: 'all', label: 'All Sizes' },
    { value: 'entire-home', label: 'Entire Home (11)' },
    { value: 'private-room', label: 'Private Room (4)' },
    { value: 'shared-room', label: 'Shared Room (5)' }
  ];


  selectedCategory="";

  categories = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment (4)' },
    { value: 'bungalow', label: 'Bungalow (3)' },
    { value: 'cabin', label: 'Cabin (2)' },
    { value: 'condos', label: 'Condos (4)' },
    { value: 'house', label: 'House (2)' },
    { value: 'loft', label: 'Loft (3)' },
    { value: 'villa', label: 'Villa (2)' }
  ];


  selectedCity="";
  cities = [
    { value: 'all', label: 'All Cities' },
    { value: 'paphos', label: 'Paphos (20)' }
  ];


  selectedArea="";

  areas = [
    { value: 'all', label: 'All Areas' },
    { value: 'geroskipou', label: 'Geroskipou (3)' },
    { value: 'kato-paphos', label: 'Kato Paphos (4)' },
    { value: 'ktima', label: 'Ktima (1)' },
    { value: 'paphos-town', label: 'Paphos Town (4)' },
    { value: 'pegeia', label: 'Pegeia (4)' },
    { value: 'polis-chrysochous', label: 'Polis Chrysochous (4)' }
  ];

  selectedOrder="";

  sortOrders = [
    { value: '1', label: 'Price High to Low' },
    { value: '2', label: 'Price Low to High' },
    { value: '3', label: 'Newest first' },
    { value: '4', label: 'Oldest first' },
    { value: '11', label: 'Newest Edited' },
    { value: '12', label: 'Oldest Edited' },
    { value: '5', label: 'Bedrooms High to Low' },
    { value: '6', label: 'Bedrooms Low to High' },
    { value: '7', label: 'Bathrooms High to Low' },
    { value: '8', label: 'Bathrooms Low to High' },
    { value: '0', label: 'Default' }
  ];

}
