import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TripService } from 'src/app/services/trips/trip.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  tripForm: FormGroup;
  selectedFiles: File[] = [];
  isDragOver = false;

  tripTypes: string[] = [
    'Corporate retreats',
    'Conference travel',
    'Networking events',
    'Pilgrimages',
    'Spiritual retreats',
    'Group travel'
  ];

  currencies: string[] = [
    'Euro',
    'USD',
    'GBP',
    'JPY',
    'CAD'
  ];

  languages: string[] = [
    'English',
    'French',
    'Arabic'
  ];

  includedServices: string[] = [
    'Transport',
    'Meals',
    'Guide',
    'Insurance',
    'Accomodation',
    'Activities'
  ];

  selectedServices: string[] = [];

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    public dialogRef: MatDialogRef<AddTripComponent>,

  ) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      destinations: ['', Validators.required],
      durationDays: [null, Validators.required],
      minGroupSize: [null, Validators.required],
      maxGroupSize: [null, Validators.required],
      packagePrice: [null, Validators.required],
      currency: ['', Validators.required],
      availableFrom: [null, Validators.required],
      availableTo: [null, Validators.required],
      includedServices: ['', Validators.required],
      preferredLanguages: ['', Validators.required ],
      termsAccepted: [false],
      approved: [false]
    });
  }

  ngOnInit(): void {
    // Update includedServices form control when services change
    this.tripForm.get('includedServices')?.valueChanges.subscribe(() => {
      this.tripForm.get('includedServices')?.updateValueAndValidity();
    });
  }

  onServiceChange(event: any, service: string) {
    if (event.checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter(s => s !== service);
    }
    this.tripForm.get('includedServices')?.setValue(this.selectedServices.join(','));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(files: FileList) {
    this.selectedFiles = Array.from(files).filter(file =>
      ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
    );
  }

  onSubmit() {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    if (this.selectedFiles.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }

    const formData = { ...this.tripForm.value };

    // Format dates to DD/MM/YYYY
    if (formData.availableFrom) {
      formData.availableFrom = this.formatDate(formData.availableFrom);
    }
    if (formData.availableTo) {
      formData.availableTo = this.formatDate(formData.availableTo);
    }

    this.tripService.saveTrip(formData, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Trip saved successfully!');
        this.resetForm();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error saving trip: ' + error.message);
      }
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private resetForm() {
    this.tripForm.reset({
      title: '',
      description: '',
      type: '',
      destinations: '',
      durationDays: null,
      minGroupSize: null,
      maxGroupSize: null,
      packagePrice: null,
      currency: '',
      availableFrom: null,
      availableTo: null,
      includedServices: '',
      preferredLanguages: '',
      termsAccepted: false,
      approved: false
    });
    this.selectedFiles = [];
    this.selectedServices = [];
  }

  closeModal(): void {
    this.resetForm();
    this.dialogRef.close();
  }
}