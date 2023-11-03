import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent {
  user$!: Observable<any>;
  form!: FormGroup;

  constructor(private authSvc: AuthService, private readonly fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.authSvc.userState$;
  }

  private initForm(): void { // Init reactive form
    this.form = this.fb.group({
      account: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    console.log("sending")
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName && fieldName.invalid && fieldName.touched;
  }

}
