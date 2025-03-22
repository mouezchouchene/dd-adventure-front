import { ServiceComponent } from './pages/service/service.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PropertyOwnerComponent } from './pages/property-owner/property-owner.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailsComponent } from './pages/properties/property-details/property-details.component';
import { ListingsComponent } from './pages/listings/listings.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    
  },
  {
    path: 'home',
    redirectTo:''
    
  },
  {
    path: 'about-us',
    component: AboutComponent,
    
  },
  {
    path: 'service',
    component: ServiceComponent,
    
  },
  {
    path: 'faq',
    component: FaqComponent,
   
  },
  {
    path: 'contact-us',
    component: ContactComponent,
    
  },
  {
    path: 'blog',
    component: BlogComponent,
    
  },
  // {
  //   path: 'properties',
  //   component: PropertiesComponent,
    
  // },
  {
    path: 'properties/:id/property-details',
    component: PropertyDetailsComponent,
    
  },
  {
    path: 'search',
    component: ListingsComponent,
    
  },
  {
    path: 'logout',
    component: LogoutComponent,
    
  },
  {
    path:'property-owner',
    loadChildren: () => import('./pages/property-owner/property-owner.module').then(m => m.PropertyOwnerModule),
    canActivate:[authGuardGuard],
    data: { role: 'ROLE_PROPERTY_OWNER' }
    
    
  },
  {
    path:'booking-property',
    loadChildren: () => import('./pages/booking-property/booking-property.module').then(m => m.BookingPropertyModule),
    canActivate:[authGuardGuard],
    data: { role: 'ROLE_CLIENT' }

    
    
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
