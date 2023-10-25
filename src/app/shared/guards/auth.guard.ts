import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard = () => {
  // Dependencies injection in function, not a class
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userState$
    .pipe(
      take(1),
      //tap( (res) => console.log(!! res)),
      tap( (isLoggedIn) => (isLoggedIn ? router.navigate(['/home']) : true))
    )
};
