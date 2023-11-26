import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TftService } from 'src/app/services/tft.service';

@Component({
  selector: 'app-tft',
  templateUrl: './tft.component.html'
})
export class TftComponent {
  user$!: Observable<any>;

  constructor(
    private tftService: TftService,
    private authSvc: AuthService,
    private router: Router){
  }

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
    this.checkUserData();
  }

  checkUserData(): void {
    this.user$.pipe(
      take(1)
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid; 
          const accountName = await this.tftService.getAccountName(userId);
          if (accountName) { 
            this.tftService.loggedIn.next(true);
            this.router.navigate(['/games/tft/stats']);
          } else {
            this.tftService.loggedIn.next(false);
            this.router.navigate(['/games/tft/login']);
          }
        }
      }
    });
  }
}
