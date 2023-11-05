import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

/* Components */
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { EsportsComponent } from './components/esports/esports.component';
import { HomeComponent } from './components/home/home.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorMessageComponent } from './shared/auth-form/components/error-message/error-message.component';
import { LeagueOfLegendsComponent } from './components/league-of-legends/league-of-legends.component';
import { AuthFormComponent } from "./shared/auth-form/auth-form.component";
import { LoginAdvertisementComponent } from './components/login-advertisement/login-advertisement.component';
import { GamesBarComponent } from './components/games-bar/games-bar.component';

/* Firebase */
import { firebaseApp$, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { ReactiveFormsModule } from '@angular/forms';

/* NgPrime */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* http requests */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NewsComponent,
        EsportsComponent,
        HomeComponent,
        GeneralInformationComponent,
        AboutUsComponent,
        LogInComponent,
        SignUpComponent,
        EmailVerificationComponent,
        ForgotPasswordComponent,
        LeagueOfLegendsComponent,
        LoginAdvertisementComponent,
        GamesBarComponent
    ],
    providers: [GoogleAuthProvider],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
            const auth = getAuth();
            // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
            return auth;
        }),
        provideFirestore(() => {
            const firestore = getFirestore();
            // connectFirestoreEmulator(firestore, 'http://localhost', 9098);
            return firestore;
        }),
        AuthFormComponent,
        ReactiveFormsModule,
        ErrorMessageComponent,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class AppModule { }
