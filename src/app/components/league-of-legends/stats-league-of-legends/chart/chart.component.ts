import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() puuid!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.puuid) {
      console.log(this.puuid);
    }
  }


}
