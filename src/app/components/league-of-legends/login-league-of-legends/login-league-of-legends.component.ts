import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';


@Component({
  selector: 'app-login-league-of-legends',
  templateUrl: './login-league-of-legends.component.html',
  styleUrls: ['./login-league-of-legends.component.css']
})
export class LoginLeagueOfLegendsComponent {
  user$!: Observable<any>;
  form!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private readonly fb: FormBuilder,
    private lolService: LeagueOfLegendsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.authSvc.userState$;
  }

  private initForm(): void {
    // Init reactive form
    this.form = this.fb.group({
      account: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.user$.pipe(
      take(1) //Take the first value emitted from observable
    ).subscribe({
      next: (user) => {
        if (user) {
          const userId = user.uid; // Need page account to save into database doc
          const accountName = this.form.get('account')!.value;
          this.lolService.verifyAccount(accountName)
            .subscribe({
              next: (response) => {
                console.log('Server response:', response);
                this.lolService.saveUserData(userId, this.form.value)
                  .then(() => {
                    this.lolService.loggedIn.next(true);
                    console.log('League of Legends Data saved successfully!');
                    this.router.navigate(['/games/league-of-legends/stats']);
                  })
                  .catch(error => {
                    console.error('There has been an error saving data: ', error);
                  });
              },
              error: (error) => {
                console.error('Error verifying account (didn\'t found): ', error);
              }
            });
        }
      }
    });
  }
  

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName && fieldName.invalid && fieldName.touched;
  }
}
