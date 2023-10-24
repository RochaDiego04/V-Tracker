import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { EsportsComponent } from './components/esports/esports.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  /* General Paths*/
  {path: '', component: HomeComponent},
  {path: 'views/news', component: NewsComponent},
  {path: 'views/esports', component: EsportsComponent},
  {path: 'views/general-information', component: GeneralInformationComponent},
  {path: 'views/about-us', component: AboutUsComponent},
  /* User Paths */
  {path: 'user/log-in', component: LogInComponent},
  {path: 'user/sign-up', component: SignUpComponent},
  {path: 'user/email-verification', component: EmailVerificationComponent},
  {path: 'user/forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
