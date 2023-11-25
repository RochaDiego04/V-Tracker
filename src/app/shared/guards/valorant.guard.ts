import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ValorantService } from 'src/app/services/valorant.service';

export const valorantGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const valoService = inject(ValorantService);
  const router = inject(Router);
  return valoService.loggedIn.pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn && state.url.includes('login')) {
        router.navigate(['/games/valorant/stats']);
        return false;
      } else if (!loggedIn && state.url.includes('stats')) {
        router.navigate(['/games/valorant/login']);
        return false;
      }
      return true;
    })
  );
};
