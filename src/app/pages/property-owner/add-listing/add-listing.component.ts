import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { Router } from '@angular/router';
import { Component, ViewChild, ChangeDetectionStrategy, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
})
export class AddListingComponent {
  map!: L.Map;
  @ViewChild('map') mapContainer!: ElementRef;
  listingSelected: any = {};
  selected: any;
  images: { imageUrl: string }[] = [];

  constructor(
    private fB: FormBuilder,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddListingComponent>,
    public countriesService: CountriesServiceService,
    private router: Router,
    private propertiesListingsService: PropertiesService
  ) {}

  ngOnInit(): void {
    console.log('Initial listingSelected:', this.listingSelected);
  }

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
    { name: 'Shepherd’s hut', icon: 'fa fa-tree', isSelected: false },
    { name: 'Tent', icon: 'fa fa-tent', isSelected: false },
    { name: 'Tiny home', icon: 'fa fa-home', isSelected: false },
    { name: 'Tower', icon: 'fa fa-building', isSelected: false },
    { name: 'Treehouse', icon: 'fa fa-tree', isSelected: false },
    { name: 'Trullo', icon: 'fa fa-building', isSelected: false },
    { name: 'Windmill', icon: 'fa fa-wind', isSelected: false },
    { name: 'Yurt', icon: 'fa fa-tent', isSelected: false }
  ];

  placeTypes = [
    { value: 'entirePlace', name: 'An entire place', description: 'Guests have the whole place to themselves.', icon: 'fa fa-home' },
    { value: 'room', name: 'A room', description: 'Guests have their own room in a home, plus access to shared spaces.', icon: 'fa fa-bed' },
    { value: 'sharedRoom', name: 'A shared room in a hostel', description: 'Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.', icon: 'fa fa-users' }
  ];

  guestfavorites = [
    { controlName: 'wifi', label: 'WiFi', icon: 'wifi' },
    { controlName: 'tv', label: 'TV', icon: 'tv' },
    { controlName: 'kitchen', label: 'Kitchen', icon: 'house' },
    { controlName: 'washer', label: 'Washer', icon: 'basket' },
    { controlName: 'freeParking', label: 'Free Parking', icon: 'parking' },
    { controlName: 'paidParking', label: 'Paid Parking', icon: 'cash' },
    { controlName: 'airConditioning', label: 'Air Conditioning', icon: 'snow' },
    { controlName: 'Dedicatedworkspace', label: 'Dedicated workspace', icon: 'laptop' }
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

  highlightOptions = [
    { controlName: 'peaceful', label: 'Peaceful', icon: 'heart-fill' },
    { controlName: 'unique', label: 'Unique', icon: 'gift-fill' },
    { controlName: 'familyFriendly', label: 'Family-friendly', icon: 'baby-carriage-fill' },
    { controlName: 'stylish', label: 'Stylish', icon: 'house-door-fill' },
    { controlName: 'central', label: 'Central', icon: 'geo-alt-fill' },
    { controlName: 'spacious', label: 'Spacious', icon: 'people-fill' }
  ];

  bookingOptions = [
    { controlName: 'approveFirst5Bookings', title: 'Approve your first 5 bookings', description: 'Start by reviewing reservation requests, then switch to Instant Book.', icon: 'calendar-check-fill' },
    { controlName: 'useInstantBook', title: 'Use Instant Book', description: 'Let guests book automatically.', icon: 'lightning-fill' }
  ];

  welcomeOptions = [
    { controlName: 'anyAirbnbGuest', title: 'Any Airbnb guest', description: 'Get reservations faster when you welcome anyone from the Airbnb community.', icon: 'circle-fill' },
    { controlName: 'experiencedGuest', title: 'An experienced guest', description: 'For your first guest, welcome someone with a good track record on Airbnb.', icon: 'circle' }
  ];

  firstFormGroup = this.fB.group({});
  secondFormGroup = this.fB.group({});
  thirdFormGroup = this.fB.group({ place: ['', Validators.required] });
  fourFormGroup = this.fB.group({ placeType: ['', Validators.required] });
  mineFormGroup = this.fB.group({}); 
  sevenFormGroup = this.fB.group({
    country: ['', Validators.required],
    streetAddress: ['', Validators.required],
    aptFloorBldg: [''],
    city: ['', Validators.required],
    provinceState: [''],
    postalCode: ['']
  });
  eightFormGroup: FormGroup<{
    guests: FormControl<number>;
    bedrooms: FormControl<number>;
    beds: FormControl<number>;
    bathrooms: FormControl<number>;
  }> = this.fB.group({
    guests: new FormControl<number>(2, { nonNullable: true, validators: Validators.required }),
    bedrooms: new FormControl<number>(1, { nonNullable: true, validators: Validators.required }),
    beds: new FormControl<number>(1, { nonNullable: true, validators: Validators.required }),
    bathrooms: new FormControl<number>(1, { nonNullable: true, validators: Validators.required })
  });
  tenFormGroup = this.fB.group({
    wifi: [false], tv: [false], kitchen: [false], washer: [false], freeParking: [false], paidParking: [false],
    airConditioning: [false], Dedicatedworkspace: [false], pool: [false], hotTub: [false], patio: [false],
    bbqGrill: [false], outdoorDining: [false], firePit: [false], poolTable: [false], indoorFireplace: [false],
    piano: [false], exerciseEquipment: [false], lakeAccess: [false], beachAccess: [false], skiInSkiOut: [false],
    outdoorShower: [false], smokeAlarm: [false], firstAidKit: [false], fireExtinguisher: [false], carbonMonoxideAlarm: [false]
  });
  elevenFormGroup = this.fB.group({});
  twelveFormGroup = this.fB.group({ title: ['', [Validators.required, Validators.maxLength(32)]] });
  thirteenFormGroup = this.fB.group({
    peaceful: [false], unique: [false], familyFriendly: [false], stylish: [false], central: [false], spacious: [false]
  });
  fourteenFormGroup = this.fB.group({ description: ['', [Validators.required, Validators.maxLength(500)]] });
  fiveteenFormGroup = this.fB.group({}); 
  sixteenFormGroup = this.fB.group({ bookingOption: ['approveFirst5Bookings'] });
  seventeenFormGroup = this.fB.group({ welcomeOption: ['anyAirbnbGuest'] });
  eighteenFormGroup = this.fB.group({ price: [33] });
  nineteenFormGroup = this.fB.group({
    newListing: [true], weekly: [true], monthly: [true], WeeklyDiscount: [10], MonthlyDiscount: [20]
  });
  twentyFormGroup = this.fB.group({
    hostingType: ['private', Validators.required], exteriorCamera: [false], noiseMonitor: [false], weaponsPresent: [false]
  });

  selectPlace(value: string, option: { name: string; icon: string; isSelected: boolean }) {
    this.thirdFormGroup.patchValue({ place: value });
    this.listingSelected.place = value;
    this.placeOptions.forEach(opt => opt.isSelected = (opt === option));
  }

  selectPlaceType(value: string) {
    this.fourFormGroup.patchValue({ placeType: value });
  }

  toggleAmenity(controlName: string): void {
    const control = this.tenFormGroup.get(controlName);
    if (control) control.setValue(!control.value);
  }

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
        reader.onload = (e) => this.images.push({ imageUrl: e.target?.result as string });
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(image: { imageUrl: string }) {
    this.images = this.images.filter(img => img !== image);
  }

  maxSelectedError: boolean = false;

  toggleHighlight(controlName: string) {
    const control = this.thirteenFormGroup.get(controlName);
    if (control) {
      if (control.value) {
        control.setValue(false);
      } else {
        const selectedCount = Object.values(this.thirteenFormGroup.controls).filter(ctrl => ctrl.value).length;
        if (selectedCount >= 2) {
          this.maxSelectedError = true;
          return;
        }
        control.setValue(true);
        this.maxSelectedError = false;
      }
    }
  }

  getControlValue(controlName: string): boolean {
    return this.thirteenFormGroup.get(controlName)?.value || false;
  }

  onBookingOptionChange(selectedOptionIndex: number) {
    const selectedOption = this.bookingOptions[selectedOptionIndex];
    this.sixteenFormGroup.patchValue({ bookingOption: selectedOption.controlName });
  }

  onWelcomeOptionChange(selectedOptionIndex: number) {
    const selectedOption = this.welcomeOptions[selectedOptionIndex];
    this.seventeenFormGroup.patchValue({ welcomeOption: selectedOption.controlName });
  }

  price = 33;
  guestPrice = 38;
  isEditing = false;
  showDetails = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onPriceBlur() {
    this.isEditing = false;
    const priceValue = this.eighteenFormGroup.get('price')?.value;
    this.price = priceValue !== null && priceValue !== undefined ? parseInt(priceValue.toString(), 10) || 0 : 0;
    this.guestPrice = this.price + 5;
  }

  togglePriceDetails() {
    this.showDetails = !this.showDetails;
  }

  characterCount = 0;

  updateCharacterCount() {
    this.characterCount = this.twelveFormGroup.get('title')?.value?.length || 0;
  }

  updateCharacterCountDesc() {
    this.characterCount = this.fourteenFormGroup.get('description')?.value?.length || 0;
  }

  increment(field: string, formGroup: FormGroup) {
    formGroup.patchValue({ [field]: formGroup.get(field)!.value + 1 });
  }

  decrement(field: string, formGroup: FormGroup) {
    if (formGroup.get(field)!.value > 1) {
      formGroup.patchValue({ [field]: formGroup.get(field)!.value - 1 });
    }
  }

  onSubmit() {
    const listingData = {
      place: this.thirdFormGroup.get('place')?.value,
      placeType: this.fourFormGroup.get('placeType')?.value,
      country: this.sevenFormGroup.get('country')?.value,
      streetAddress: this.sevenFormGroup.get('streetAddress')?.value,
      aptFloorBldg: this.sevenFormGroup.get('aptFloorBldg')?.value || '',
      city: this.sevenFormGroup.get('city')?.value,
      title: this.twelveFormGroup.get('title')?.value,
      description: this.fourteenFormGroup.get('description')?.value,
      bookingOption: this.sixteenFormGroup.get('bookingOption')?.value,
      welcomeOption: this.seventeenFormGroup.get('welcomeOption')?.value,
      price: this.eighteenFormGroup.get('price')?.value,
      weeklyDiscount: this.nineteenFormGroup.get('WeeklyDiscount')?.value,
      monthlyDiscount: this.nineteenFormGroup.get('MonthlyDiscount')?.value,
      hostingType: this.twentyFormGroup.get('hostingType')?.value,
      wifi: this.tenFormGroup.get('wifi')?.value,
      tv: this.tenFormGroup.get('tv')?.value,
      kitchen: this.tenFormGroup.get('kitchen')?.value,
      washer: this.tenFormGroup.get('washer')?.value,
      freeParking: this.tenFormGroup.get('freeParking')?.value,
      paidParking: this.tenFormGroup.get('paidParking')?.value,
      airConditioning: this.tenFormGroup.get('airConditioning')?.value,
      dedicatedWorkspace: this.tenFormGroup.get('Dedicatedworkspace')?.value,
      pool: this.tenFormGroup.get('pool')?.value,
      hotTub: this.tenFormGroup.get('hotTub')?.value,
      patio: this.tenFormGroup.get('patio')?.value,
      bbqGrill: this.tenFormGroup.get('bbqGrill')?.value,
      outdoorDining: this.tenFormGroup.get('outdoorDining')?.value,
      firePit: this.tenFormGroup.get('firePit')?.value,
      poolTable: this.tenFormGroup.get('poolTable')?.value,
      indoorFireplace: this.tenFormGroup.get('indoorFireplace')?.value,
      piano: this.tenFormGroup.get('piano')?.value,
      exerciseEquipment: this.tenFormGroup.get('exerciseEquipment')?.value,
      lakeAccess: this.tenFormGroup.get('lakeAccess')?.value,
      beachAccess: this.tenFormGroup.get('beachAccess')?.value,
      skiInSkiOut: this.tenFormGroup.get('skiInSkiOut')?.value,
      outdoorShower: this.tenFormGroup.get('outdoorShower')?.value,
      smokeAlarm: this.tenFormGroup.get('smokeAlarm')?.value,
      firstAidKit: this.tenFormGroup.get('firstAidKit')?.value,
      fireExtinguisher: this.tenFormGroup.get('fireExtinguisher')?.value,
      carbonMonoxideAlarm: this.tenFormGroup.get('carbonMonoxideAlarm')?.value,
      peaceful: this.thirteenFormGroup.get('peaceful')?.value,
      unique: this.thirteenFormGroup.get('unique')?.value,
      familyFriendly: this.thirteenFormGroup.get('familyFriendly')?.value,
      stylish: this.thirteenFormGroup.get('stylish')?.value,
      exteriorCamera: this.twentyFormGroup.get('exteriorCamera')?.value,
      noiseMonitor: this.twentyFormGroup.get('noiseMonitor')?.value,
      weaponsPresent: this.twentyFormGroup.get('weaponsPresent')?.value,
      central: this.thirteenFormGroup.get('central')?.value,
      newListing: this.nineteenFormGroup.get('newListing')?.value,
      weekly: this.nineteenFormGroup.get('weekly')?.value,
      monthly: this.nineteenFormGroup.get('monthly')?.value,
      spacious: this.thirteenFormGroup.get('spacious')?.value,

      guests: this.eightFormGroup.get('guests')?.value,
      bedrooms: this.eightFormGroup.get('bedrooms')?.value,
      beds: this.eightFormGroup.get('beds')?.value,
      bathrooms: this.eightFormGroup.get('bathrooms')?.value
    };

    const images = this.images.map(image => this.dataURLtoFile(image.imageUrl, `image_${Date.now()}.png`));

    console.log("Submitting Form Data:", JSON.stringify(listingData, null, 2));
    console.log("Images:", images);

    this.propertiesListingsService.saveProperty(listingData, images)
      .subscribe({
        next: (response) => {
          console.log("Listing successfully saved:", response);
          this.snackbarService.open('The property has been successfully added.', '', 5000);
          this.dialogRef.close();
          this.router.navigateByUrl('/property-owner/my-listings');
        },
        error: (error) => {
          console.error("Error saving listing:", error);
          this.snackbarService.open(`Failed to add property: ${error.status} - ${error.error?.message || 'Unknown error'}`, 'Close', 5000);
        }
      });
  }

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