import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { Router } from '@angular/router';
import { Component, ViewChild ,ChangeDetectionStrategy, ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as L from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';

import { MatDialogRef } from '@angular/material/dialog';
import { CountriesServiceService } from 'src/app/services/countries/countries-service.service';
import { PropertiesService } from 'src/app/services/property-owner/properties.service';
@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AddListingComponent  {

  map!: L.Map ;

  @ViewChild('map') mapContainer!: ElementRef;
  //mode;
  listingSelected: any = {};
  //selected: Date | null ;*

  selected: any ;


  constructor(private fB: FormBuilder,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddListingComponent>,
    public countriesService: CountriesServiceService,
    private elRef: ElementRef,
    private router:Router,
    private propertiesListingsService: PropertiesService

  ) {

    this.twentyFormGroup
  }

  ngOnInit(): void {
   // this.initMap();
    this.eightFormGroup;

    this.thirdFormGroup;

    console.log('Initial listingSelected:', this.listingSelected);
    this.sixteenFormGroup;

    this.nineteenFormGroup;
    this.twentyFormGroup


  }

 




  // initMap(): void {
  //   this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13); 

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(this.map);

    
  //   const marker = L.marker([51.505, -0.09]).addTo(this.map);
  //   marker.bindPopup('Your location').openPopup();

  //   this.map.on('click', (e) => {
  //     this.onMapClick(e);
  //   });
  // }

  propertyCategorie = 'apartment';
  propertyCategories = [
    { key: '', value: 'None' },
    { key: 'apartment', value: 'Apartment' },
    { key: 'bungalow', value: 'Bungalow' },
    { key: 'cabin', value: 'Cabin' },
    { key: 'condos', value: 'Condos' },
    { key: 'house', value: 'House' },
    { key: 'loft', value: 'Loft' },
    { key: 'villa', value: 'Villa' }
  ];

  roomType ="entire home";
  roomTypes = [
    { key: '', value: 'None' },
    { key: 'entire home', value: 'Entire home' },
    { key: 'private room', value: 'Private room' },
    { key: 'shared room', value: 'Shared room' }
  ];
  guestNumber="1"
   guestNumbers = [
    { key: '0', value: '0' },
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '8', value: '8' },
    { key: '9', value: '9' },
    { key: '10', value: '10' },
    { key: '11', value: '11' },
    { key: '12', value: '12' },
    { key: '13', value: '13' },
    { key: '14', value: '14' },
    { key: '15', value: '15' }
];


city="turin"

 cities = [
  // Italy
  { key: 'rome', value: 'Rome' },
  { key: 'milan', value: 'Milan' },
  { key: 'naples', value: 'Naples' },
  { key: 'turin', value: 'Turin' },
  { key: 'palermo', value: 'Palermo' },
  { key: 'genoa', value: 'Genoa' },
  { key: 'bologna', value: 'Bologna' },
  { key: 'florence', value: 'Florence' },
  { key: 'bari', value: 'Bari' },
  { key: 'catania', value: 'Catania' },
  { key: 'venice', value: 'Venice' },
  { key: 'verona', value: 'Verona' },
  
  // Tunisia
  { key: 'tunis', value: 'Tunis' },
  { key: 'sfax', value: 'Sfax' },
  { key: 'sousse', value: 'Sousse' },
  { key: 'ettadhamen', value: 'Ettadhamen' },
  { key: 'kairouan', value: 'Kairouan' },
  { key: 'gabes', value: 'Gabes' },
  { key: 'bizerte', value: 'Bizerte' },
  { key: 'ariana', value: 'Ariana' },
  { key: 'gafsa', value: 'Gafsa' },
  { key: 'monastir', value: 'Monastir' },
  { key: 'ben arous', value: 'Ben Arous' },
  { key: 'medenine', value: 'Medenine' },

  // Philippines
  { key: 'manila', value: 'Manila' },
  { key: 'quezon city', value: 'Quezon City' },
  { key: 'davao', value: 'Davao' },
  { key: 'caloocan', value: 'Caloocan' },
  { key: 'cebu city', value: 'Cebu City' },
  { key: 'zamboanga', value: 'Zamboanga' },
  { key: 'taguig', value: 'Taguig' },
  { key: 'pasig', value: 'Pasig' },
  { key: 'cagayan de oro', value: 'Cagayan de Oro' },
  { key: 'parañaque', value: 'Parañaque' },
  { key: 'bacolod', value: 'Bacolod' },
  { key: 'makati', value: 'Makati' }
];
neighborhood ="oltrarno"
 neighborhoods = [
  // Italy
  { key: 'trastevere', value: 'Trastevere, Rome' },
  { key: 'brera', value: 'Brera, Milan' },
  { key: 'vomero', value: 'Vomero, Naples' },
  { key: 'san salvario', value: 'San Salvario, Turin' },
  { key: 'montepellegrino', value: 'Montepellegrino, Palermo' },
  { key: 'boccadasse', value: 'Boccadasse, Genoa' },
  { key: 'navile', value: 'Navile, Bologna' },
  { key: 'oltrarno', value: 'Oltrarno, Florence' },
  { key: 'madonnella', value: 'Madonnella, Bari' },
  { key: 'canalicchio', value: 'Canalicchio, Catania' },
  { key: 'dorsoduro', value: 'Dorsoduro, Venice' },
  { key: 'veronetta', value: 'Veronetta, Verona' },
  
  // Tunisia
  { key: 'la marsa', value: 'La Marsa, Tunis' },
  { key: 'sakiet ez zit', value: 'Sakiet Ezzit, Sfax' },
  { key: 'medina', value: 'Medina, Sousse' },
  { key: 'kabaria', value: 'Kabaria, Ettadhamen' },
  { key: 'bir al hafey', value: 'Bir Al Hafey, Kairouan' },
  { key: 'ghanouch', value: 'Ghanouch, Gabes' },
  { key: 'zarzouna', value: 'Zarzouna, Bizerte' },
  { key: 'mnihla', value: 'Mnihla, Ariana' },
  { key: 'oasis', value: 'Oasis, Gafsa' },
  { key: 'sidi alouane', value: 'Sidi Alouane, Monastir' },
  { key: 'radès', value: 'Radès, Ben Arous' },
  { key: 'ben gardane', value: 'Ben Gardane, Medenine' },

  // Philippines
  { key: 'binondo', value: 'Binondo, Manila' },
  { key: 'cubao', value: 'Cubao, Quezon City' },
  { key: 'matina', value: 'Matina, Davao' },
  { key: 'bagong barrio', value: 'Bagong Barrio, Caloocan' },
  { key: 'mabolo', value: 'Mabolo, Cebu City' },
  { key: 'tumaga', value: 'Tumaga, Zamboanga' },
  { key: 'fort bonifacio', value: 'Fort Bonifacio, Taguig' },
  { key: 'ortigas center', value: 'Ortigas Center, Pasig' },
  { key: 'carmen', value: 'Carmen, Cagayan de Oro' },
  { key: 'sucat', value: 'Sucat, Parañaque' },
  { key: 'barangay sanggunian', value: 'Barangay Sanggunian, Bacolod' },
  { key: 'salcedo village', value: 'Salcedo Village, Makati' }
];


country="italy"



 cleaningFeeCalculation="per night"

cleaningFeeCalculations = [
  { key: 'single fee', value: 'Single Fee' },
  { key: 'per night', value: 'Per night' },
  { key: 'per guest', value: 'Per Guest' },
  { key: 'per night per guest', value: 'Per night per Guest' }
];

onDay=""
 allDay = [
  { key: 'all', value: 'All' },
  { key: 'monday', value: 'Monday' },
  { key: 'tuesday', value: 'Tuesday' },
  { key: 'wednesday', value: 'Wednesday' },
  { key: 'thursday', value: 'Thursday' },
  { key: 'friday', value: 'Friday' },
  { key: 'saturday', value: 'Saturday' },
  { key: 'sunday', value: 'Sunday' }
];

videoSource='';
videoSources = [
  { key: 'vimeo', value: 'Vimeo' },
  { key: 'youtube', value: 'YouTube' }
];


  

  place='House'

  placeOptions = [
    { name: 'House', icon: 'fa fa-home', isSelected: false }, 
    { name: 'Apartment', icon: 'fa fa-building', isSelected: false },
    { name: 'Barn', icon: 'fa fa-barn', isSelected: false },
    { name: 'Bed & breakfast', icon: 'fa fa-cutlery', isSelected: false },
    { name: 'Boat', icon: 'fa fa-ship', isSelected: false },
    { name: 'Cabin', icon: 'fa fa-tree', isSelected: false }, 
    { name: 'Camper/RV', icon: 'fa fa-car', isSelected: false }, 
    { name: 'Casa particular', icon: 'fa fa-home', isSelected: false },
    { name: 'Castle', icon: 'fa fa-castle', isSelected: false },
    { name: 'Cave', icon: 'fa fa-mountain', isSelected: false },
    { name: 'Container', icon: 'fa fa-cube', isSelected: false }, 
    { name: 'Cycladic home', icon: 'fa fa-home', isSelected: false },
    { name: 'Dammuso', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Dome', icon: 'fa fa-circle-o', isSelected: false }, 
    { name: 'Earth home', icon: 'fa fa-globe', isSelected: false },
    { name: 'Farm', icon: 'fa fa-tractor', isSelected: false },
    { name: 'Guesthouse', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Hotel', icon: 'fa fa-hotel', isSelected: false },
    { name: 'Houseboat', icon: 'fa fa-ship', isSelected: false },
    { name: 'Kezhan', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Minsu', icon: 'fa fa-home', isSelected: false },
    { name: 'Riad', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Ryokan', icon: 'fa fa-hotel', isSelected: false },
    { name: 'Shepherd’s hut', icon: 'fa fa-tree', isSelected: false } ,
    { name: 'Tent', icon: 'fa fa-tent', isSelected: false }, 
    { name: 'Tiny home', icon: 'fa fa-home', isSelected: false },
    { name: 'Tower', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Treehouse', icon: 'fa fa-tree', isSelected: false },
    { name: 'Trullo', icon: 'fa fa-building', isSelected: false }, 
    { name: 'Windmill', icon: 'fa fa-wind', isSelected: false }, 
    { name: 'Yurt', icon: 'fa fa-tent', isSelected: false }
  ];

  selectPlace(value: string, option: { name: string; icon: string; isSelected: boolean }) {
    console.log('Selecting place:', value);
    
    // Set the selected value in the form
    this.thirdFormGroup.patchValue({ place: value });
  
    // Update listingSelected
    this.listingSelected.place = value;
    console.log('Updated listingSelected:', this.listingSelected);
  
    // Update selection status
    this.placeOptions.forEach(opt => {
      opt.isSelected = (opt === option);
      console.log('Updated option:', opt);
    });
  }



  placeType=''
  placeTypes = [
    {
      value: 'entirePlace',
      name: 'An entire place',
      description: 'Guests have the whole place to themselves.',
      icon: 'fa fa-home'
    },
    {
      value: 'room',
      name: 'A room',
      description: 'Guests have their own room in a home, plus access to shared spaces.',
      icon: 'fa fa-bed'
    },
    {
      value: 'sharedRoom',
      name: 'A shared room in a hostel',
      description: 'Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.',
      icon: 'fa fa-users'
    },
  ];



  guestfavorites = [
    { controlName: 'wifi', label: 'WiFi', icon: 'wifi' },
    { controlName: 'tv', label: 'TV', icon: 'tv' },
    { controlName: 'kitchen', label: 'Kitchen', icon: 'house' },
    { controlName: 'washer', label: 'Washer', icon: 'basket' },
    { controlName: 'freeParking', label: 'Free Parking', icon: 'parking' },
    { controlName: 'paidParking', label: 'Paid Parking', icon: 'cash' },
    { controlName: 'airConditioning', label: 'Air Conditioning', icon: 'snow' },
    { controlName: 'Dedicatedworkspace', label: 'Dedicated workspace', icon: 'laptop' },
  ];


  standoutAmenities = [
    { controlName: 'pool', label: 'Pool', icon: 'water' },
    { controlName: 'hotTub', label: 'Hot Tub', icon: 'hot_tub' },
    { controlName: 'patio', label: 'Patio', icon: 'patio' },
    { controlName: 'bbqGrill', label: 'BBQ Grill', icon: 'grill' },
    { controlName: 'outdoorDining', label: 'Outdoor Dining Area', icon: 'outdoor_dining' },
    { controlName: 'firePit', label: 'Fire Pit', icon: 'fireplace' },
    { controlName: 'poolTable', label: 'Pool Table', icon: 'pool' },
    { controlName: 'indoorFireplace', label: 'Indoor Fireplace', icon: 'fireplace' },
    { controlName: 'piano', label: 'Piano', icon: 'piano' },
    { controlName: 'exerciseEquipment', label: 'Exercise Equipment', icon: 'fitness_center' },
    { controlName: 'lakeAccess', label: 'Lake Access', icon: 'water' },
    { controlName: 'beachAccess', label: 'Beach Access', icon: 'beach_access' },
    { controlName: 'skiInSkiOut', label: 'Ski-in/Ski-out', icon: 'ac_unit' },
    { controlName: 'outdoorShower', label: 'Outdoor Shower', icon: 'shower' }
  ];
  

  safetyFeatures = [
    { controlName: 'smokeAlarm', label: 'Smoke Alarm', icon: 'alarm' },
    { controlName: 'firstAidKit', label: 'First Aid Kit', icon: 'medical_services' },
    { controlName: 'fireExtinguisher', label: 'Fire Extinguisher', icon: 'fire_extinguisher' },
    { controlName: 'carbonMonoxideAlarm', label: 'Carbon Monoxide Alarm', icon: 'warning' }
  ];
  



  toggleAmenity(controlName: string): void {
    console.log(`Toggling => ${controlName}`);
    const control = this.tenFormGroup.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }
  




  
images: { imageUrl: string; }[] = [];

onFileSelected(event: any) {
  const files = event.target.files;
  this.handleFiles(files);
}

onDrop(event: any) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  this.handleFiles(files);
}

onDragOver(event: any) {
  event.preventDefault(); 
}

handleFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push({ imageUrl: e.target?.result as string });
        console.log("Image added:", e.target?.result); 
      };
      reader.readAsDataURL(file);
    }
  }
  this.elevenFormGroup.patchValue({ images: this.images });
}

removeImage(image: { imageUrl: string; }) {
  this.images = this.images.filter(img => img !== image);
  this.elevenFormGroup.patchValue({ images: this.images });
}




highlightOptions = [
  { controlName: 'peaceful', label: 'Peaceful', icon: 'heart-fill' },
  { controlName: 'unique', label: 'Unique', icon: 'gift-fill' },
  { controlName: 'familyFriendly', label: 'Family-friendly', icon: 'baby-carriage-fill' },
  { controlName: 'stylish', label: 'Stylish', icon: 'house-door-fill' },
  { controlName: 'central', label: 'Central', icon: 'geo-alt-fill' },
  { controlName: 'spacious', label: 'Spacious', icon: 'people-fill' }
];

maxSelectedError: boolean = false;


toggleHighlight(controlName: string) {
  const control = this.thirteenFormGroup.get(controlName);

  if (control) {
    if (control.value) {
      // Unselect if already selected
      control.setValue(false);
    } else {
      // Count currently selected options
      const selectedCount = Object.values(this.thirteenFormGroup.controls).filter(
        (ctrl) => ctrl.value
      ).length;

      if (selectedCount >= 2) {
        // If more than two options are selected, show error
        this.maxSelectedError = true;
        return;
      }

      // Select current option
      control.setValue(true);
      this.maxSelectedError = false; // Reset error flag if within limit
    }
  }
}

getControlValue(controlName: string): boolean {
  return this.thirteenFormGroup.get(controlName)?.value || false;
}




bookingOptions = [
  { controlName: 'approveFirst5Bookings', title: 'Approve your first 5 bookings', 
    description: 'Start by reviewing reservation requests, then switch to Instant Book, so guests can book automatically.', 
    icon: 'calendar-check-fill' 
  },


  { controlName: 'useInstantBook', 
    title: 'Use Instant Book', 
    description: 'Let guests book automatically.', 
    icon: 'lightning-fill' }

];



onBookingOptionChange(selectedOptionIndex: number) {
  // Store the controlName, not the index
  const selectedOption = this.bookingOptions[selectedOptionIndex];
  this.sixteenFormGroup.patchValue({ bookingOption: selectedOption.controlName }); 
  console.log("Selected booking option:", selectedOption.controlName);
}





welcomeOptions = [
  { controlName: 'anyAirbnbGuest', title: 'Any Airbnb guest', description: 'Get reservations faster when you welcome anyone from the Airbnb community.', icon: 'circle-fill' },
  { controlName: 'experiencedGuest', title: 'An experienced guest', description: 'For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great Host.', icon: 'circle' }
];

onWelcomeOptionChange(selectedOptionIndex: number) {
  // Store the controlName, not the index
  const selectedOption = this.welcomeOptions[selectedOptionIndex];
  this.seventeenFormGroup.patchValue({ welcomeOption: selectedOption.controlName }); 
  console.log("Selected welcome option:", selectedOption.controlName);
}






price = 33; // Initial price
guestPrice = 38; // Initial guest price
isEditing = false; // Flag for editing mode
showDetails = false; // Flag for showing price details

toggleEdit() {
  this.isEditing = !this.isEditing;
}

onPriceBlur() {
  this.isEditing = false;
  this.price = parseInt(this.eighteenFormGroup.get('price')?.value as string, 10) || 0;
  this.guestPrice = this.price + 5;
}

togglePriceDetails() {
  this.showDetails = !this.showDetails;
}













  firstFormGroup = this.fB.group({

  });
  
  secondFormGroup = this.fB.group({
    
  });

  thirdFormGroup= this.fB.group({
    place: [this.listingSelected ? this.listingSelected.place : '', [Validators.required]]
  });

  fourFormGroup = this.fB.group({
    placeType: [this.listingSelected ? this.listingSelected.placeType : '', [Validators.required]
  ],

    
  });
  

  // fiveFormGroup= this.fB.group({
  //   address: [this.listingSelected ? this.listingSelected.address : '']
  // });

  // sixFormGroup= this.fB.group({
  //   guests: [this.listingSelected ? this.listingSelected.guests : '', [Validators.required]],
  //   bedrooms: [this.listingSelected ? this.listingSelected.bedrooms : '', [Validators.required]],
  //   beds: [this.listingSelected ? this.listingSelected.beds : '', [Validators.required]],
  //   bathrooms: [this.listingSelected ? this.listingSelected.bathrooms : '', [Validators.required]]
  // });


  sevenFormGroup = this.fB.group({
    country: [this.listingSelected ? this.listingSelected.country : '', [Validators.required]],
    streetAddress: [this.listingSelected ? this.listingSelected.streetAddress : '', [Validators.required]],
    aptFloorBldg: [this.listingSelected ? this.listingSelected.aptFloorBldg : ''],
    city: [this.listingSelected ? this.listingSelected.city : '', [Validators.required]],
    provinceState: [this.listingSelected ? this.listingSelected.provinceState : ''],
    postalCode: [this.listingSelected ? this.listingSelected.postalCode : '']
  });

  eightFormGroup = this.fB.group({
    guests: [this.listingSelected.guests !== undefined ? this.listingSelected.guests : 2, [Validators.required]],
    bedrooms: [this.listingSelected.bedrooms !== undefined ? this.listingSelected.bedrooms : 1, [Validators.required]],
    beds: [this.listingSelected.beds !== undefined ? this.listingSelected.beds : 1, [Validators.required]],
    bathrooms: [this.listingSelected.bathrooms !== undefined ? this.listingSelected.bathrooms : 1, [Validators.required]]
  });

  mineFormGroup = this.fB.group({
    
  });


  tenFormGroup = this.fB.group({
    wifi: [this.listingSelected ? this.listingSelected.wifi : false],
    tv: [this.listingSelected ? this.listingSelected.tv : false],
    kitchen: [this.listingSelected ? this.listingSelected.kitchen : false],
    washer: [this.listingSelected ? this.listingSelected.washer : false],
    freeParking: [this.listingSelected ? this.listingSelected.freeParking : false],
    paidParking: [this.listingSelected ? this.listingSelected.paidParking : false],
    airConditioning: [this.listingSelected ? this.listingSelected.airConditioning : false],
    Dedicatedworkspace: [this.listingSelected ? this.listingSelected.Dedicatedworkspace : false],
    pool: [this.listingSelected ? this.listingSelected.pool : false],
    hotTub: [this.listingSelected ? this.listingSelected.hotTub : false],
    patio: [this.listingSelected ? this.listingSelected.patio : false],
    bbqGrill: [this.listingSelected ? this.listingSelected.bbqGrill : false],
    outdoorDining: [this.listingSelected ? this.listingSelected.outdoorDining : false],
    firePit: [this.listingSelected ? this.listingSelected.firePit : false],
    poolTable: [this.listingSelected ? this.listingSelected.poolTable : false],
    indoorFireplace: [this.listingSelected ? this.listingSelected.indoorFireplace : false],
    piano: [this.listingSelected ? this.listingSelected.piano : false],
    exerciseEquipment: [this.listingSelected ? this.listingSelected.exerciseEquipment : false],
    lakeAccess: [this.listingSelected ? this.listingSelected.lakeAccess : false],
    beachAccess: [this.listingSelected ? this.listingSelected.beachAccess : false],
    skiInSkiOut: [this.listingSelected ? this.listingSelected.skiInSkiOut : false],
    outdoorShower: [this.listingSelected ? this.listingSelected.outdoorShower : false],
    smokeAlarm: [this.listingSelected ? this.listingSelected.smokeAlarm : false],
    firstAidKit: [this.listingSelected ? this.listingSelected.firstAidKit : false],
    fireExtinguisher: [this.listingSelected ? this.listingSelected.fireExtinguisher : false],
    carbonMonoxideAlarm: [this.listingSelected ? this.listingSelected.carbonMonoxideAlarm : false],
  });



  

  elevenFormGroup = this.fB.group({
    images: [this.listingSelected ? this.listingSelected.images : null],

  });


  twelveFormGroup = this.fB.group({
    title: [this.listingSelected ? this.listingSelected.title : "",[Validators.required, Validators.maxLength(32)]]

  });




  characterCount = 0;

  updateCharacterCount() {
    this.characterCount = this.twelveFormGroup.get('title')?.value?.length || 0;
  }



  updateCharacterCountDesc() {
    this.characterCount = this.fourteenFormGroup.get('description')?.value?.length || 0;
  }



  thirteenFormGroup = this.fB.group({
    peaceful: [this.listingSelected?.peaceful ?? false],
    unique: [this.listingSelected?.unique ?? false],
    familyFriendly: [this.listingSelected?.familyFriendly ?? false],
    stylish: [this.listingSelected?.stylish ?? false],
    central: [this.listingSelected?.central ?? false],
    spacious: [this.listingSelected?.spacious ?? false]
  });
  


  fourteenFormGroup = this.fB.group({
    description: [this.listingSelected ? this.listingSelected.description : "",[Validators.required, Validators.maxLength(500)]]

  });


  fiveteenFormGroup = this.fB.group({
    
  });


  // sixteenFormGroup  = this.fB.group({
  //   approveFirst5Bookings: [this.listingSelected ? this.listingSelected.approveFirst5Bookings : true ],
  //   useInstantBook: [this.listingSelected ? this.listingSelected.useInstantBook : false ],
  

    
  // });


  sixteenFormGroup = this.fB.group({
    bookingOption: [this.bookingOptions[0].controlName] 
  });



  seventeenFormGroup = this.fB.group({
    welcomeOption: ['anyAirbnbGuest'] 
  });




  eighteenFormGroup = this.fB.group({
    price: [this.listingSelected ? this.listingSelected.price : 33]
  });



  nineteenFormGroup = this.fB.group({
    newListing: [true], 
    weekly: [true], 
    monthly: [true] ,
    WeeklyDiscount: [10], 
    MonthlyDiscount: [20], 

  });




twentyFormGroup = this.fB.group({
    hostingType: [this.listingSelected ? this.listingSelected.hostingType :'private', Validators.required], 
    exteriorCamera: [this.listingSelected ? this.listingSelected.exteriorCamera :false],                        
    noiseMonitor: [this.listingSelected ? this.listingSelected.noiseMonitor :false],                         
    weaponsPresent: [this.listingSelected ? this.listingSelected.weaponsPresent :false]                        
  });










  getErrorRequiredMessage() {
    return 'This field is required';
  }



  increment(field: string, formGroup: FormGroup) {
    formGroup.patchValue({ [field]: formGroup.get(field)!.value + 1 });
  }

  decrement(field: string, formGroup: FormGroup) {
    if (formGroup.get(field)!.value > 1) {
      formGroup.patchValue({ [field]: formGroup.get(field)!.value - 1 });
    }

  }


  
  selectPlaceType(value: string) {
    this.fourFormGroup.get('placeType')?.setValue(value);
  }


  // onMapClick(event: L.LeafletMouseEvent): void {
  //   const { lat, lng } = event.latlng;
  //   this.fiveFormGroup.patchValue({ address: `${lat}, ${lng}` }); // Update form control with coordinates
  //   L.marker([lat, lng]).addTo(this.map!).bindPopup('Selected Location').openPopup();
  // }
  


  onSubmit() {
    // Get values from all form groups
    const thirdFormGroupValues = this.thirdFormGroup.value;
    const fourFormGroupValues = this.fourFormGroup.value;
    const sevenFormGroupValues = this.sevenFormGroup.value;
    const tenFormGroupValues = this.tenFormGroup.value;
    const elevenFormGroupValues = this.elevenFormGroup.value;
    const twelveFormGroupValues = this.twelveFormGroup.value;
    const thirteenFormGroupValues = this.thirteenFormGroup.value;
    const fourteenFormGroupValues = this.fourteenFormGroup.value;
    const sixteenFormGroupValues = this.sixteenFormGroup.value;
    const seventeenFormGroupValues = this.seventeenFormGroup.value;
    const eighteenFormGroupValues = this.eighteenFormGroup.value;
    const nineteenFormGroupValues = this.nineteenFormGroup.value;
    const twentyFormGroupValues = this.twentyFormGroup.value;
  
    const listingData = {
      ...thirdFormGroupValues,
      ...fourFormGroupValues,
      ...sevenFormGroupValues,
      ...tenFormGroupValues,
      ...elevenFormGroupValues,
      ...twelveFormGroupValues,
      ...thirteenFormGroupValues,
      ...fourteenFormGroupValues,
      ...sixteenFormGroupValues,
      ...seventeenFormGroupValues,
      ...eighteenFormGroupValues,
      ...nineteenFormGroupValues,
      ...twentyFormGroupValues
    };
  
    // Convert images to File objects if necessary
    const images = this.images.map(image => this.dataURLtoFile(image.imageUrl, 'image.png'));
  
    console.log("Form Data =>", listingData);
  
    this.propertiesListingsService.saveProperty(listingData, images)
      .subscribe(
        (response) => {
          console.log("Listing successfully saved => ", response);
          this.snackbarService.open(
            'The property has been successfully added.',
            '',
            5000
          );
          // Optional: You might want to close the dialog or navigate after success
          this.dialogRef.close();
          this.router.navigateByUrl('/property-owner/my-listings');
        },
        (error) => {
          console.error("Error saving listing:", error);
        }
      );
  }
  
  // Helper function to convert data URL to File object
  dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }






  
  closeModal(): void {
    this.dialogRef.close();
  }


}
