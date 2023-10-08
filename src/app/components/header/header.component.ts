import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './hamburger-menu.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  toggleHamburgerMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


}
