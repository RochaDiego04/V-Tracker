import { Injectable } from '@angular/core';
import { deleteField, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueOfLegendsService {

  API_KEY = 'RGAPI-62fe5b6d-174c-459a-a9dc-813d35daf271'; 
  private firestore = getFirestore();
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  // POST
  async postAccountName(userId: string, userData: UserData) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    try {
      await setDoc(docRef, userData, { merge: true });
    } catch (error) {
    }
  }

  // GET
  async getAccountName(userId: string): Promise<string | null> {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data()['account'];
    } else {
      console.log("No such document!");
      return null;
    }
  }

  // DELETE
  async deleteAccountName(userId: string) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    return updateDoc(docRef, {
      account: deleteField()
    });
  }

  // GET FROM API
  getAccountInfoAPI(accountName: string) {
    let url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${this.API_KEY}`;
    return this.http.get(url);
  }

}
