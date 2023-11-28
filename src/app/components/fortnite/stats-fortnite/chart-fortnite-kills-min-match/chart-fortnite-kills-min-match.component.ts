import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-fortnite-kills-min-match',
  templateUrl: './chart-fortnite-kills-min-match.component.html',
  styleUrls: ['./chart-fortnite-kills-min-match.component.css',  '../spinner.css']
})
export class ChartFortniteKillsMinMatchComponent implements OnInit, OnChanges {
  @Input() accountInfo: any;

  barChartData: any[] = [];
  loading = true;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Game Mode';
  showYAxisLabel = true;
  yAxisLabel = 'Kills';

  colorScheme = 'air';

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountInfo']) {
      this.loadData();
    }
  }
  
  onSelect(event: any) {
    console.log(event);
  }

  private loadData() {
    if (this.accountInfo) {
      this.getKillsAllGameModes();
      this.loading = false;
    }
  }

  getKillsAllGameModes() {
    const gameModes = this.accountInfo.data.stats.all;

    this.barChartData = Object.keys(gameModes)
      .filter(gameMode => gameModes[gameMode] !== null) // Filtering null gamemode information (trios)
      .map(gameMode => {
        return {
          name: gameMode,
          series: [
            {
              name: 'KillsPerMatch',
              value: gameModes[gameMode].killsPerMatch
            },
            {
              name: 'killsPerMin',
              value: gameModes[gameMode].killsPerMin
            }
          ]
        };
      });
    //console.log(this.barChartData);
  }
}
