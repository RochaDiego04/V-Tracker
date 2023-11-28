import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-fortnite-wins',
  templateUrl: './chart-fortnite-wins.component.html',
  styleUrls: ['./chart-fortnite-wins.component.css',  '../spinner.css']
})
export class ChartFortniteWinsComponent implements OnInit, OnChanges {
  @Input() accountInfo: any;

  barChartData: any[] = [];
  loading = true;

  // options
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
      this.getWinsAllGameModes();
      this.loading = false;
    }
  }

  getWinsAllGameModes() {
    const gameModes = this.accountInfo.data.stats.all;
  
    this.barChartData = Object.keys(gameModes)
      .filter(gameMode => gameModes[gameMode] !== null && gameMode !== 'overall') // Filtering null gamemode information (trios) and overall because it would take 50%
      .map(gameMode => {
        return {
          name: gameMode,
          value: gameModes[gameMode].wins // Assuming 'wins' is the property for wins
        };
      });
    console.log(this.barChartData);
  }
  
}
