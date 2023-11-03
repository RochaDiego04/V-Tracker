import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login-advertisement',
  templateUrl: './login-advertisement.component.html',
  styleUrls: ['./login-advertisement.component.css']
})
export class LoginAdvertisementComponent implements OnInit {
  isModalShown: boolean;

  constructor(private readonly router: Router){
    this.isModalShown = false;
  }

  ngOnInit(): void {
    this.openModal();
  }

  redirectToLogin(): void{
    this.router.navigate(['/user/log-in'])
  }

  openModal() {
    this.isModalShown = true;
  }

  closeModal() {
    this.isModalShown = false;
    this.router.navigate(['/home'])
  }

}
