import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

@Component({
  selector: 'app-league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css'],
})
export class LeagueOfLegendsComponent implements OnInit {
  user$!: Observable<any>;

  constructor(
    private lolService: LeagueOfLegendsService,
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
          const accountName = await this.lolService.getUserData(userId);
          console.log(accountName);
          if (accountName && Object.keys(accountName).length > 0) {
            this.router.navigate(['/games/league-of-legends/stats']);
          } else {
            this.router.navigate(['/games/league-of-legends/login']);
          }
        }
      }
    });
  }


}
