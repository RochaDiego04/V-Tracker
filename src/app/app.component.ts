import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'semana-final';
  
  constructor(private router: Router) {}

  isExcludedRoute(): boolean { // Exclude routes that won't show header and footer
    const excludedRoutes = ['log-in', 'sign-up', 'email-verification', 'forgot-password'];
    const currentRoute = this.router.url.toLowerCase();
    return excludedRoutes.some(route => currentRoute.includes(route));
  }
}
