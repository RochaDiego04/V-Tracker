import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TftService } from 'src/app/services/tft.service';

@Component({
  selector: 'app-stats-tft',
  templateUrl: './stats-tft.component.html',
  styleUrls: ['./stats-tft.component.css']
})
export class StatsTftComponent {
  user$!: Observable<any>;

  constructor(
    private tftService: TftService,
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
          await this.tftService.deleteAccountName(userId);
          this.tftService.loggedIn.next(false);
          console.log('User logged out successfully');
          this.router.navigate(['/games/tft/login']);
        }
      }
    });
  }
}
