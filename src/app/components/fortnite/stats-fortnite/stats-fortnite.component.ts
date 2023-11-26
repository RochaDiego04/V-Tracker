import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FortniteService } from 'src/app/services/fortnite.service';

@Component({
  selector: 'app-stats-fortnite',
  templateUrl: './stats-fortnite.component.html',
  styleUrls: ['./stats-fortnite.component.css']
})
export class StatsFortniteComponent {
  user$!: Observable<any>;

  constructor(
    private fortniteService: FortniteService,
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
          await this.fortniteService.deleteAccountName(userId);
          this.fortniteService.loggedIn.next(false);
          console.log('User logged out successfully');
          this.router.navigate(['/games/fortnite/login']);
        }
      }
    });
  }
}
