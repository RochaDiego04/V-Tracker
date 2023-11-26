import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { FortniteService } from 'src/app/services/fortnite.service';

export const fortniteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const fortniteService = inject(FortniteService);
  const router = inject(Router);
  return fortniteService.loggedIn.pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn && state.url.includes('login')) {
        router.navigate(['/games/fortnite/stats']);
        return false;
      } else if (!loggedIn && state.url.includes('stats')) {
        router.navigate(['/games/fortnite/login']);
        return false;
      }
      return true;
    })
  );
};
