import { Injectable } from '@angular/core';
import { deleteField, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorantService {

  private firestore = getFirestore();
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

    // POST FIRESTORE
    async postAccountName(userId: string, userData: UserData) {
      const docRef = doc(this.firestore, `Users/${userId}/Games/Valorant`);
      try {
        await setDoc(docRef, userData, { merge: true });
      } catch (error) {
      }
    }
  
    // GET FIRESTORE
    async getAccountName(userId: string): Promise<string | null> {
      const docRef = doc(this.firestore, `Users/${userId}/Games/Valorant`);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        return docSnap.data()['account'];
      } else {
        console.log("No such document!");
        return null;
      }
    }
  
    // DELETE FIRESTORE
    async deleteAccountName(userId: string) {
      const docRef = doc(this.firestore, `Users/${userId}/Games/Valorant`);
      return updateDoc(docRef, {
        account: deleteField()
      });
    }

    
}
