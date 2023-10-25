import { Injectable} from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect  } from '@angular/fire/auth';
import { Router } from '@angular/router';


interface ErrorResponse {
  code: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly auth: Auth,
    private readonly googleProvider: GoogleAuthProvider,
    private readonly router: Router) {
      // this.signOut();
    }

  get userState$() { //Observable
    return authState(this.auth);
  }

  async logInGoogle(): Promise<void> { //this async method returns a promise
    try {
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.log('Google Login: ',error)
    }
  }

  async signUp(email: string, password: string): Promise<void>{
    try {
      const {user} = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password); // create user

      await this.sendEmailVerification(user); // send email verification
      this.router.navigate(['/user/email-verification']); // redirect to waiting page

    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
    }
  }

  async logIn(email: string, password: string): Promise<void>{
    try {
      const {user} = await signInWithEmailAndPassword(this.auth, email, password); // Destructuring user credential
      this.checkUserIsVerified(user);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
    }
  }

  async signOut(): Promise<void>{
    try {
      await this.auth.signOut();
    } catch (error: unknown) {
      console.log("Error signing out",error);
    }
  }

  async sendEmailVerification(user: User):Promise<void>{
    try {
      await sendEmailVerification(user);
    } catch (error: unknown) {
      console.log("Error sending email",error);
    }
  }

  async sendPasswordResetEmail(email: string):Promise<void>{
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      console.log("Error sending email pw recovery",error);
    }
  }

  private checkUserIsVerified(user: User): void {
    const route = user.emailVerified ? '/home' : '/user/email-verification';  // Redirect to home or email-verification
    this.router.navigate([route]);
  }

}
