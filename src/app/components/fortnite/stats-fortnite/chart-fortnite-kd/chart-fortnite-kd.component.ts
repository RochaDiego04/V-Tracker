import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-fortnite-kd',
  templateUrl: './chart-fortnite-kd.component.html',
  styleUrls: ['./chart-fortnite-kd.component.css', '../spinner.css']
})
export class ChartFortniteKdComponent implements OnInit, OnChanges {
  @Input() accountInfo: any;

  barChartData: any[] = [];
  loading = true;

  // options
  gradient = false;
  showLegend = true;
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
          value: gameModes[gameMode].kd // 'kd' is the property for Kills/Deaths ratio
        };
      });
    //console.log(this.barChartData);
  }
}
