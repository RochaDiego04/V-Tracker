
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-kills',
  templateUrl: './chart-kills.component.html',
  styleUrls: ['./chart-kills.component.css', '../spinner.css'],
})
export class ChartKillsComponent implements OnInit, OnChanges {
  @Input() puuid!: string;
  @Input() matchesData: any[] = [];

  barChartData: any[] = [];
  loading = true;

  // options
  view: [number,number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Kills';
  showYAxisLabel = true;
  yAxisLabel = 'Match';

  colorScheme = 'nightLights';


  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Every time there is a change on puuid and matchesData, this will try to loadData
    if (changes['puuid'] || changes['matchesData']) {
      this.loadData();
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  private loadData() {
    if (this.puuid && this.matchesData && this.matchesData.length > 0) {
      this.getKillsLastMatches();
      this.loading = false;
    }
  }

  getKillsLastMatches() {
    // Get kills made by me in every match
    this.barChartData = this.matchesData.map((match, index) => {
      const playerIndex = this.getPlayerIndex(match);
      const playerData = match.info.participants[playerIndex];
      return {
        name: `Match ${index + 1}`,
        value: playerData ? playerData.kills : 0,
      };
    });
    console.log(this.barChartData);
  }
  
  getPlayerIndex(match:any): number {
    // Get player's index by its puuid in the given match
    const playerIndex = match.info.participants.findIndex(
      (participant: any) => {
        return participant.puuid === this.puuid;
      }
    );
    
    return playerIndex !== undefined && playerIndex !== -1 ? playerIndex : 0;
  }
  
  // showInfo() {
  //   console.log(this.puuid);
  //   console.log(this.matchesData);
  //   console.log(this.barChartData);
  // }

}
