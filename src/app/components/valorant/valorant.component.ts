import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ValorantService } from 'src/app/services/valorant.service';



@Component({
  selector: 'app-valorant',
  templateUrl: './valorant.component.html'
})
export class ValorantComponent {
  user$!: Observable<any>;

  constructor(
    private valoService: ValorantService,
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
          const accountName = await this.valoService.getAccountName(userId);
          if (accountName) { 
            this.valoService.loggedIn.next(true);
            this.router.navigate(['/games/valorant/stats']);
          } else {
            this.valoService.loggedIn.next(false);
            this.router.navigate(['/games/valorant/login']);
          }
        }
      }
    });
  }
}
