import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ValorantService } from 'src/app/services/valorant.service';


@Component({
  selector: 'app-login-valorant',
  templateUrl: './login-valorant.component.html',
  styleUrls: ['./login-valorant.component.css']
})
export class LoginValorantComponent {
  user$!: Observable<any>;
  form!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private readonly fb: FormBuilder,
    private valoService: ValorantService,
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
          this.valoService.postAccountName(userId, this.form.value)
            .then(() => {
              this.valoService.loggedIn.next(true);
              console.log('Valorant Data saved successfully!');
              this.router.navigate(['/games/valorant/stats']);
            })
            .catch(error => {
              console.error('There has been an error saving data: ', error);
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
