import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, take, tap } from 'rxjs';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

@Component({
  selector: 'app-league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css'],
})
export class LeagueOfLegendsComponent {
  user$!: Observable<any>;
  form!: FormGroup;
  accountData: Object;

  constructor(
    private authSvc: AuthService,
    private readonly fb: FormBuilder,
    private lolService: LeagueOfLegendsService
  ) {
    this.accountData = new Object();
  }

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
    ).subscribe((user) => {
      if (user) {
        const userId = user.uid;
        const accountName = this.form.get('account')!.value;
        this.lolService.verifyAccount(accountName)
          .subscribe(response => {
            console.log('Server response:', response);
            this.accountData = response;
            this.lolService.saveUserData(userId, this.form.value)
              .then(() => {
                console.log('League of Legends Data saved successfully!');
              })
              .catch(error => {
                console.error('There has been an error saving data: ', error);
              });
          }, error => {
            console.error('Error verifying account (didn\'t found): ', error);
          });
      }
    });
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName && fieldName.invalid && fieldName.touched;
  }
}
