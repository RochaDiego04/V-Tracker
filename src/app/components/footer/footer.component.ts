import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  public isCompanyExpanded = false;
  public isSocialsExpanded = false;
  public isOtherExpanded = false;

  ngOnInit(): void { // if it is a large device, start already expanded lists
    if (window.innerWidth >= 640) {
      this.isCompanyExpanded = true;
      this.isSocialsExpanded = true;
      this.isOtherExpanded = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 640) {
      this.isCompanyExpanded = true;
      this.isSocialsExpanded = true;
      this.isOtherExpanded = true;
    }
    if (event.target.innerWidth < 640) {
      this.isCompanyExpanded = false;
      this.isSocialsExpanded = false;
      this.isOtherExpanded = false;
    }
  }

  toggleCompanyList() {
    if (window.innerWidth >= 640) { //Expand the list for big devices.
      this.isCompanyExpanded = true;
    } else {
      this.isCompanyExpanded = !this.isCompanyExpanded;
    }
  }

  toggleSocialsList() {
    if (window.innerWidth >= 640) { //Expand the list for big devices.
      this.isSocialsExpanded = true;
    } else {
      this.isSocialsExpanded = !this.isSocialsExpanded;
    }
  }

  toggleOtherList() {
    if (window.innerWidth >= 640) { //Expand the list for big devices.
      this.isOtherExpanded = true;
    } else {
      this.isOtherExpanded = !this.isOtherExpanded;
    }
  }
}
