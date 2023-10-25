import { Component, Input, OnInit, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

const actionType = {
   logIn: {
    action: 'logIn',
    title: 'Log In'
   },
   signUp: {
    action: 'signUp',
    title: 'Sign Up'
   },
} as const;

type ActionType = keyof typeof actionType;

@Component({
    selector: 'app-auth-form',
    standalone: true,
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css'],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, ErrorMessageComponent]
})
export class AuthFormComponent implements OnInit {
  @Input() action!: ActionType;
  form!: FormGroup;
  title!: string;

  user$!: Observable<any>;
  
  private readonly emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  
  constructor(private readonly fb: FormBuilder, private readonly authSvc: AuthService) { //dependency injection
  
  }

  ngOnInit(): void {
    this.title =
      this.action === actionType.logIn.action
      ? actionType.logIn.title
      : actionType.signUp.title

    this.initForm();

    this.user$ = this.authSvc.userState$;
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.action === actionType.logIn.action
      ? this.authSvc.logIn(email, password)
      : this.authSvc.signUp(email, password);
  }
  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName && fieldName.invalid && fieldName.touched;
  }

  logInGoogle(): void {
    this.authSvc.logInGoogle();
  }
  
  private initForm(): void { // Init reactive form
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
}
