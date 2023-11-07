import { Injectable } from '@angular/core';
import { deleteField, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeagueOfLegendsService {

  API_KEY = 'RGAPI-08416257-e31e-4928-865b-8f0985de7b00'; 
  private firestore = getFirestore();

  constructor(private http: HttpClient) {}

  // POST
  saveUserData(userId: string, userData: UserData) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    return setDoc(docRef, userData, { merge: true });
  }

  // GET
  async getUserData(userId: string) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }

  // DELETE
  async deleteUserData(userId: string) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    return updateDoc(docRef, {
      account: deleteField()
    });
  }

  // GET FROM API
  verifyAccount(accountName: string) {
    let url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${this.API_KEY}`;
    return this.http.get(url);
  }

}
