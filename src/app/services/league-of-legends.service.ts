import { Injectable } from '@angular/core';
import { deleteField, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { UserData } from '../interfaces/user-data';
import { setDoc, doc } from "firebase/firestore";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueOfLegendsService {

  API_KEY = 'RGAPI-50517f67-e434-4af0-b31e-8ca2884a2886'; 
  private firestore = getFirestore();
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  // POST FIRESTORE
  async postAccountName(userId: string, userData: UserData) {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    try {
      await setDoc(docRef, userData, { merge: true });
    } catch (error) {
    }
  }

  // GET FIRESTORE
  async getAccountName(userId: string): Promise<string | null> {
    const docRef = doc(this.firestore, `Users/${userId}/Games/LeagueOfLegends`);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      //console.log("User data:", docSnap.data());
      return docSnap.data()['account'];
    } else {
      console.log("No such document!");
      return null;
    }
  }

  // DELETE FIRESTORE
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

  getProfilePhotoAPI(profileIconId: number, version: string): string {
    let url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;
    return url;
  }

  getCurrentVersionAPI(): Observable<string> { // The version is needed in the Profile photo
    let url = 'https://ddragon.leagueoflegends.com/api/versions.json';
    return this.http.get<string[]>(url).pipe(map(versions => versions[0]));
  }

  getMatchIds(puuid: string): Observable<any> {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${this.API_KEY}`;
    return this.http.get<any>(url);
  }

  getMatchData(matchId: string): Observable<any> {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.API_KEY}`;
    return this.http.get<any>(url);
  }



}
