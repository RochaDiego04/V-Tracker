import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TftService } from 'src/app/services/tft.service';

@Component({
  selector: 'app-login-tft',
  templateUrl: './login-tft.component.html',
  styleUrls: ['./login-tft.component.css']
})
export class LoginTftComponent {
  user$!: Observable<any>;
  form!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private readonly fb: FormBuilder,
    private tftService: TftService,
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
          const userId = user.uid; // You must have a main account to link account to it.
          const accountName = this.form.get('account')!.value;
          this.tftService.getAccountInfoAPI(accountName) // Validate if account exists
            .subscribe({
              next: (response) => {
                console.log('Server response:', response);
                this.tftService.postAccountName(userId, this.form.value)
                  .then(() => {
                    this.tftService.loggedIn.next(true);
                    console.log('TFT Data saved successfully!');
                    this.router.navigate(['/games/tft/stats']);
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
