import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-fortnite-kills',
  templateUrl: './chart-fortnite-kills.component.html',
  styleUrls: ['./chart-fortnite-kills.component.css', '../spinner.css']
})
export class ChartFortniteKillsComponent implements OnInit, OnChanges {
  @Input() accountInfo: any;

  barChartData: any[] = [];
  loading = true;

  // options
  view: [number,number] = [900, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Game Mode';
  showYAxisLabel = true;
  yAxisLabel = 'Kills';

  colorScheme = 'nightLights';

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
          value: gameModes[gameMode].kills,
        };
      });
    console.log(this.barChartData);
  }
  
}
