import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  email!: FormControl;
  isEmailSent = false;
  private readonly emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  constructor(private readonly authSvc: AuthService) { //dependency injection
    
  }

  ngOnInit(): void {
    this.initEmailField();
  }

  hasError(): boolean {
    return !!this.email.invalid && this.email.touched;
  }

  async onSubmit(e: Event): Promise<void> {
    e?.stopPropagation(); //Don't refresh form when submit
    try {
      this.isEmailSent = true;
      await this.authSvc.sendPasswordResetEmail(this.email?.value);
    } catch (error) {
      this.isEmailSent = false;
      console.log("Failed reset password", error);
    }
  }

  private initEmailField(): void {
    this.email = new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]
    );
  }
}
