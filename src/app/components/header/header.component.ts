import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './hamburger-menu.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  public user$!:Observable<User | null>;

  constructor(private authSvc: AuthService){
    this.user$ = this.authSvc.userState$;
  }

  toggleHamburgerMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async onSignOut(): Promise<void> {
    await this.authSvc.signOut()
  }

}
