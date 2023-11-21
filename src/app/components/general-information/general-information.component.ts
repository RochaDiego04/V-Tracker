import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent {
  /* Chart data */
  multi = [
    {
      "name": "You",
      "series": [
        {
          "name": "1",
          "value": 12
        },
        {
          "name": "2",
          "value": 9
        },
        {
          "name": "3",
          "value": 6
        },
        {
          "name": "4",
          "value": 15
        }
      ]
    },
    {
      "name": "Your Friend",
      "series": [
        {
          "name": "1",
          "value": 11
        },
        {
          "name": "2",
          "value": 8
        },
        {
          "name": "3",
          "value": 8
        },
        {
          "name": "4",
          "value": 10
        }
      ]
    }
  ]

  /* Features ngFor data */
  features = [
    {
      title: 'Unlock Your Gaming Potential',
      info: 'Empower yourself with personalized insights and analytics to level up your gaming skills.',
      list: ['Track victories and defeats', 'Discover winning strategies', 'Achieve higher levels', 'Compete with confidence'],
      imageSrc: '/src/assets/images/general_information/graph.png',
      reversed: false
    },
    {
      title: 'Visualize Your Achievements',
      info: 'Immerse yourself in a visually stunning representation of your gaming achievements with interactive graphs and charts.',
      list: ['Visualize gameplay statistics', 'Compare performance over time', 'Celebrate milestones', 'Share your success'],
      imageSrc: '/src/assets/images/general_information/graph_bars.png',
      reversed: true
    },
    {
      title: 'Dive Into Data with our Graphs',
      info: 'Experience a new dimension of data exploration with insightful pie charts, providing a holistic view of your gaming prowess.',
      list: ['Explore diverse game metrics', 'Uncover hidden patterns', 'Optimize your gameplay', 'Stay ahead of the competition'],
      imageSrc: '/src/assets/images/general_information/pie-chart.png',
      reversed: false
    }
  ];

  view: [number,number] = [750, 400];
  /* Responsive size */
  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width <= 640) { // 40em
      this.view = [400, 400];
    } else {
      this.view = [750, 400];
    }
  }

  constructor() {
    this.onResize();
  }


  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Kills';
  autoScale = true;
  colorScheme = 'nightLights';

  onSelect(event: any) {
    console.log(event);
  }
}
