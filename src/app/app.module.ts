import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyOwnerModule } from './pages/property-owner/property-owner.module';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { ServiceComponent } from './pages/service/service.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ModalHostDirective } from './directives/modal-host.directive';
import { ModalHostComponent } from './shared/components/modal-host/modal-host.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogoutComponent } from './pages/logout/logout.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BookingPropertyModule } from './pages/booking-property/booking-property.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailsComponent } from './pages/properties/property-details/property-details.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ListingsComponent } from './pages/listings/listings.component';

import { MatSelectModule } from '@angular/material/select';
import { CountryPipe } from './shared/country/country.pipe';
import { CountriesServiceService } from './services/countries/countries-service.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { LightgalleryModule} from 'lightgallery/angular';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { RouterModule } from '@angular/router';
import { DateService } from './services/date.service';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSliderModule } from '@angular/material/slider';
import { SideBarFilterSearchComponent } from './shared/components/side-bar-filter-search/side-bar-filter-search.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    FaqComponent,
    AboutComponent,
    ServiceComponent,
    BlogComponent,
    LoginComponent,
    SignupComponent,
    ModalHostDirective,
    ModalHostComponent,
    LogoutComponent,
    PropertiesComponent,
    PropertyDetailsComponent,
    ListingsComponent,
    CountryPipe,
    SearchBarComponent,
    ConfirmationDialogComponent,
    SideBarFilterSearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    PropertyOwnerModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatRadioModule,MatCheckboxModule,
    BookingPropertyModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,MatCardModule,MatDividerModule,
    NgxSpinnerModule,
    FormsModule,
    LightgalleryModule,

    CarouselModule,
    MatSliderModule,
    RouterModule.forRoot([])

  ],

  exports:[
    CountryPipe
  ],

  providers: [LoginComponent,CountriesServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DateService

  ],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
