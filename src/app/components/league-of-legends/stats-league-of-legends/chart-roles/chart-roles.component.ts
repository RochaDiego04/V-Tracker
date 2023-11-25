import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-roles',
  templateUrl: './chart-roles.component.html',
  styleUrls: ['./chart-roles.component.css', '../spinner.css']
})
export class ChartRolesComponent {
  @Input() puuid!: string;
  @Input() matchesData: any[] = [];

  pieChartData: any[] = [];
  loading = true;

  // options
  view: [number,number] = [450, 300];
  gradient = false;
  showLegend = true;
  colorScheme = 'nightLights';

  constructor() {}

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['puuid'] || changes['matchesData']) {
      this.loadData();
    }
  }

  private loadData() {
    if (this.puuid && this.matchesData && this.matchesData.length > 0) {
      this.getRolesLastMatches();
      this.loading = false;
    }
  }

  getRolesLastMatches() {
    let roles: {[key: string]: number} = {};
    this.matchesData.forEach((match) => {
      const playerIndex = this.getPlayerIndex(match);
      const playerData = match.info.participants[playerIndex];
      if (playerData) {
        const role = playerData.role;
        roles[role] = (roles[role] || 0) + 1;
      }
    });
    this.pieChartData = Object.keys(roles).map((role) => {
      return {
        name: role,
        value: roles[role],
      };
    });
    //console.log(this.pieChartData);
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
}
