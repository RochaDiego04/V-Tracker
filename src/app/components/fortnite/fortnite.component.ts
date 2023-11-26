import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FortniteService } from 'src/app/services/fortnite.service';

@Component({
  selector: 'app-fortnite',
  templateUrl: './fortnite.component.html'
})
export class FortniteComponent {
  user$!: Observable<any>;

  constructor(
    private fortniteService: FortniteService,
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
          const accountName = await this.fortniteService.getAccountName(userId);
          if (accountName) { 
            this.fortniteService.loggedIn.next(true);
            this.router.navigate(['/games/fortnite/stats']);
          } else {
            this.fortniteService.loggedIn.next(false);
            this.router.navigate(['/games/fortnite/login']);
          }
        }
      }
    });
  }
}
