import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPropertyComponent } from './booking-property.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MyInboxComponent } from './my-inbox/my-inbox.component';

const routes: Routes = [

  {
    path: '',
    component: BookingPropertyComponent,

    children: [
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'my-reservations', component: MyReservationsComponent },
      { path: 'my-inbox', component: MyInboxComponent },

      { path: '', redirectTo: '/booking-property/my-profile', pathMatch: 'full' }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingPropertyRoutingModule { }
