import { Injectable} from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';


interface ErrorResponse {
  code: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationErrorSubject = new BehaviorSubject<string>('');
  authenticationError$ = this.authenticationErrorSubject.asObservable();

  constructor(
    private readonly auth: Auth,
    private readonly googleProvider: GoogleAuthProvider,
    private readonly router: Router) {
      // this.signOut();
  }

  private mapFirebaseAuthErrorCodeToMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-login-credentials':
        return 'Invalid email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'Email is already in use. Please try another one.';
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please try again later.';
      case 'Other error code':
        return 'Custom error message.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
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
        password);

      await this.sendEmailVerification(user); 
      this.router.navigate(['/user/email-verification']); // redirect to waiting page

    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      const errorMessage = this.mapFirebaseAuthErrorCodeToMessage(code);
      this.authenticationErrorSubject.next(errorMessage);
    }
  }

  async logIn(email: string, password: string): Promise<void>{
    try {
      const {user} = await signInWithEmailAndPassword(this.auth, email, password); // Destructuring user credential
      this.checkUserIsVerified(user);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log(code)
      const errorMessage = this.mapFirebaseAuthErrorCodeToMessage(code);
      this.authenticationErrorSubject.next(errorMessage);
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
