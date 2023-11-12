import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

export const leagueOfLegendsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const lolService = inject(LeagueOfLegendsService);
  const router = inject(Router);
  return lolService.loggedIn.pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn && state.url.includes('login')) {
        router.navigate(['/games/league-of-legends/stats']);
        return false;
      } else if (!loggedIn && state.url.includes('stats')) {
        router.navigate(['/games/league-of-legends/login']);
        return false;
      }
      return true;
    })
  );
};
