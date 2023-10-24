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

/* Firebase */
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { AuthFormComponent } from "./shared/auth-form/auth-form.component";

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
        ForgotPasswordComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
            const auth = getAuth();
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
            return auth;
        }),
        provideFirestore(() => {
            const firestore = getFirestore();
            connectFirestoreEmulator(firestore, 'http://localhost', 9098);
            return firestore;
        }),
        AuthFormComponent
    ]
})
export class AppModule { }
