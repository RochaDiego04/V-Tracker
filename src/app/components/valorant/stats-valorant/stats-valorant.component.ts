import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ValorantService } from 'src/app/services/valorant.service';


@Component({
  selector: 'app-stats-valorant',
  templateUrl: './stats-valorant.component.html',
  styleUrls: ['./stats-valorant.component.css']
})
export class StatsValorantComponent {
  user$!: Observable<any>;

  constructor(
    private valoService: ValorantService,
    private authSvc: AuthService,
    private router: Router){
  }

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
  }

  logout(): void {
    this.user$.pipe(
      take(1)
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid;
          await this.valoService.deleteAccountName(userId);
          this.valoService.loggedIn.next(false);
          console.log('User logged out successfully');
          this.router.navigate(['/games/valorant/login']);
        }
      }
    });
  }

}
