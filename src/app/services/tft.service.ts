import { Injectable } from '@angular/core';
import { deleteField, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TftService {

  API_KEY = 'RGAPI-68ec0ecf-6c3d-4f6d-b475-21f94e4f8c95'; 
  private firestore = getFirestore();
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  // POST FIRESTORE
  async postAccountName(userId: string, userData: UserData) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/TFT`);
    try {
      await setDoc(docRef, userData, { merge: true });
    } catch (error) {
    }
  }

  // GET FIRESTORE
  async getAccountName(userId: string): Promise<string | null> {
    const docRef = doc(this.firestore, `Users/${userId}/Games/TFT`);
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
    const docRef = doc(this.firestore, `Users/${userId}/Games/TFT`);
    return updateDoc(docRef, {
      account: deleteField()
    });
  }

    // GET FROM API
    getAccountInfoAPI(accountName: string) {
      let url = `https://la1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${accountName}?api_key=${this.API_KEY}`;
      return this.http.get(url);
    }
}
