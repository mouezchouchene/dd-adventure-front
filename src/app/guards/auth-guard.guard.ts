import { CanActivateFn , Router , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {


  const router: Router = inject(Router);
  const authService = inject(AuthenticationService);
  const user = authService.getUser();

  if (user) {
    const requiredRole = route.data['role'];
    if (user.role === requiredRole) {
      return true;
    } else {
      router.navigate([`/${user.role}`]);
      return false;
    }
  } else {
    router.navigate(['/']);
    return false;
  }
};
