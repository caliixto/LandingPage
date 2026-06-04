import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginFormServicesService } from './components/login-form-services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(LoginFormServicesService);
  if(authService.estarLogueado()){
    return true;
  }else{
    router.navigate(['/']);
    return false;
  }

};

