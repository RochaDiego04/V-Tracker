import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() puuid!: string;
  matchInfo: any[] = []; 

  constructor(private lolService: LeagueOfLegendsService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.puuid) {

      this.lolService.getMatchIds(this.puuid).subscribe({
        next: matchIds => {
          console.log(matchIds)
          this.getMatchesInfo(matchIds);
        },
        error: error => {}
      });

    }
  }

  getMatchesInfo(matchIds: string[]): void {
    const matchRequests = matchIds.map(matchId => this.lolService.getMatchData(matchId));

    forkJoin(matchRequests).subscribe({
      next: matchDataArray => {
        this.matchInfo = matchDataArray;
        console.log(this.matchInfo); 
      },
      error: error => {}
    });
  }

}
