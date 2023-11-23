import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, firstValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

@Component({
  selector: 'app-stats-league-of-legends',
  templateUrl: './stats-league-of-legends.component.html',
  styleUrls: ['./stats-league-of-legends.component.css']
})
export class StatsLeagueOfLegendsComponent implements OnInit {
  user$!: Observable<any>;
  accountInfo!: Observable<any>;
  accountName!: string;
  profilePhotoUrl!: string; 

  private matchDataSubject = new BehaviorSubject<any[]>([]);
  matchData$ = this.matchDataSubject.asObservable();

  constructor(
    private lolService: LeagueOfLegendsService,
    private authSvc: AuthService,
    private router: Router){
  }

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
    this.getAccountInfo();
  }
  
  ngOnDestroy(): void {
    
  }

  logout(): void {
    this.user$.pipe(
      take(1)
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid;
          await this.lolService.deleteAccountName(userId);
          this.lolService.loggedIn.next(false);
          console.log('User logged out successfully');
          this.router.navigate(['/games/league-of-legends/login']);
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
          const accountName = await this.lolService.getAccountName(userId);
          if (accountName) {
            // Getting the account info with the account name
            this.accountInfo = this.lolService.getAccountInfoAPI(accountName);
            this.getProfilePhotoUrl();

            // Inside the accountInfo observable we will get the puuid.
            this.accountInfo.subscribe({
              next: async (info) => {
                const puuid = info.puuid;

               // Getting id of every match
                const matchIds = await firstValueFrom(this.lolService.getMatchIds(puuid));
                
                // Creating an array to push match data
                const matchDataArray = []; 

                // Getting every match information iterating the matches id's
                for (const matchId of matchIds) {
                  const matchData = await firstValueFrom(this.lolService.getMatchData(matchId));
                  matchDataArray.push(matchData);
                }
                // Update BehaviorSubject with matches information
                this.matchDataSubject.next(matchDataArray);
              },
              error: (error) => {
                console.error('Error getting the puuid', error);
              }
            });
          }
        }
      }
    });
  }

  getProfilePhotoUrl(): void {
    this.accountInfo.pipe(
      take(1)
    ).subscribe({
      next: async (accountInfo) => {
        const profileIconId = accountInfo.profileIconId;
        const version = await firstValueFrom(this.lolService.getCurrentVersionAPI());
        this.profilePhotoUrl = this.lolService.getProfilePhotoAPI(profileIconId, version);
      }
    });
  }

}