import { Injectable} from '@angular/core';
import { Auth, GoogleAuthProvider, authState, signInWithRedirect  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly auth: Auth, private readonly googleProvider: GoogleAuthProvider) {}

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
}
