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
  accountInfo!: Observable<any>;

  constructor(
    private fortniteService: FortniteService,
    private authSvc: AuthService,
    private router: Router){
  }

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
    this.getAccountInfo();
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

  getAccountInfo(): void {
    // Suscribing to the main user to get the uid
    this.user$.pipe(
      take(1) 
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid;
          // Getting the account name from firestore
          const accountName = await this.fortniteService.getAccountName(userId);
          if (accountName) {
            // Getting the account info with the account name
            this.accountInfo = this.fortniteService.getFortniteAccountInfoAPI(accountName);
  
            // Inside the accountInfo observable we will get the account name and level.
            this.accountInfo.subscribe({
              next: async (info) => {
                const accountName = info.data.account.name;
                const accountLevel = info.data.battlePass.level;
                const imageUrl = info.data.image;
  
                console.log('Account Name:', accountName);
                console.log('Account Level:', accountLevel);
                console.log('Image:', imageUrl);
              },
              error: (error) => {
                //console.error('Error getting the account info', error);
              }
            });
          }
        }
      }
    });
  }
  
}
