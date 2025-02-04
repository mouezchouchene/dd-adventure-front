import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPropertyRoutingModule } from './booking-property-routing.module';
import { BookingPropertyComponent } from './booking-property.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";

import {MatStepperModule} from '@angular/material/stepper';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MyInboxComponent } from './my-inbox/my-inbox.component';

@NgModule({
  declarations: [
    BookingPropertyComponent,
    MyProfileComponent,
    FavoritesComponent,
    MyReservationsComponent,
    MyInboxComponent
  ],
  imports: [
    CommonModule,
    BookingPropertyRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,MatPaginatorModule,MatSortModule,MatStepperModule,
    ReactiveFormsModule,MatSelectModule,MatCheckboxModule, 
    MatRadioModule,MatDatepickerModule,MatCardModule,MatNativeDateModule,
    MatSnackBarModule,
  ]
})
export class BookingPropertyModule { }
