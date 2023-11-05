import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LeagueOfLegendsService {

  private firestore = getFirestore();
  API_KEY = ''; 

  constructor(private http: HttpClient) { }

  saveUserData(userId: string, userData: UserData) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    return setDoc(docRef, userData, { merge: true });
  }

  verifyAccount(accountName: string) {
    let url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${this.API_KEY}`;
    return this.http.get(url);
  }

}
