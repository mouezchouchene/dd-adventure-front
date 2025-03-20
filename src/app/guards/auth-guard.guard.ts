import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.isLoggedIn()) {
    const userRole = authService.getUserRole(); 
    const requiredRole = route.data['role']; 

    if (userRole === requiredRole) {
      return true;
    } else {
      if (userRole === 'ROLE_PROPERTY_OWNER') {
        router.navigate(['/property-owner']);
      } else if (userRole === 'ROLE_CLIENT') {
        router.navigate(['/booking-property']);
      } else {
        router.navigate(['/']);
      }
      return false;
    }
  } else {
    router.navigate(['/login']); 
    return false;
  }
};