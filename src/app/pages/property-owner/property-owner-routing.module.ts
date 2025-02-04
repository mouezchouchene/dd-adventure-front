import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyOwnerComponent } from './property-owner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyOwnerComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'my-listings', component: MyListingsComponent },
      { path: 'add-new-listing', component: AddListingComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'my-reservations', component: MyReservationsComponent },
      { path: 'my-reviews', component: MyReviewsComponent },
      { path: 'my-bookings', component: BookingsComponent },
      { path: '', redirectTo: '/property-owner/dashboard', pathMatch: 'full' }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyOwnerRoutingModule { }
