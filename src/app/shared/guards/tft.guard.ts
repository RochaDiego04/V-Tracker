import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { TftService } from 'src/app/services/tft.service';

export const tftGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tftService = inject(TftService);
  const router = inject(Router);
  return tftService.loggedIn.pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn && state.url.includes('login')) {
        router.navigate(['/games/tft/stats']);
        return false;
      } else if (!loggedIn && state.url.includes('stats')) {
        router.navigate(['/games/tft/login']);
        return false;
      }
      return true;
    })
  );
};