import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  template: `<app-auth-form [action]="'logIn'" />`,
})
export class LogInComponent {

}
