import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-damage',
  templateUrl: './chart-damage.component.html',
  styleUrls: ['./chart-damage.component.css', '../spinner.css']
})
export class ChartDamageComponent {
  @Input() puuid!: string;
  @Input() matchesData: any[] = [];

  barChartData: any[] = [];
  loading = true;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Match';
  showYAxisLabel = true;
  yAxisLabel = 'Damage';

  colorScheme = 'nightLights';

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['puuid'] || changes['matchesData']) {
      this.loadData();
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  private loadData() {
    if (this.puuid && this.matchesData && this.matchesData.length > 0) {
      this.getDamageLastMatches();
      this.loading = false;
    }
  }

  getDamageLastMatches() {
    this.barChartData = this.matchesData.map((match, index) => {
      const playerIndex = this.getPlayerIndex(match);
      const playerData = match.info.participants[playerIndex];
      return {
        name: `Match ${index + 1}`,
        series: [
          {
            name: 'totalDamageDealt',
            value: playerData ? playerData.totalDamageDealt : 0,
          },
          {
            name: 'totalDamageDealtToChampions',
            value: playerData ? playerData.totalDamageDealtToChampions : 0,
          },
          {
            name: 'totalDamageTaken',
            value: playerData ? playerData.totalDamageTaken : 0,
          },
        ],
      };
    });
    console.log(this.barChartData);
  }

  getPlayerIndex(match:any): number {
    const playerIndex = match.info.participants.findIndex(
      (participant: any) => {
        return participant.puuid === this.puuid;
      }
    );
    
    return playerIndex !== undefined && playerIndex !== -1 ? playerIndex : 0;
  }
}
