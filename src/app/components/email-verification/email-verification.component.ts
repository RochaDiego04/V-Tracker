import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { filter, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {

  user: User | null = null;

  constructor(private authSvc: AuthService){
    this.authSvc.userState$.pipe(
      filter((authState) => authState !== null),
      tap((user) => (this.user = user)),
      tap(() => this.authSvc.signOut())
    )
    .subscribe();
  }

  onResendEmail(): void {
    if(this.user){
      this.authSvc.sendEmailVerification(this.user);
    }
  }
}
