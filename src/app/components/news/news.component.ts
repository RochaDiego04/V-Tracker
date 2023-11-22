import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  gridItems = [
    { 
      imageSrc: 'src/assets/images/img-news/valo.png',
      title: 'Running a Riot Games esports broadcast is a lot of work.',
      description: 'Throughout 2023, if someone tuned into a Valorant esports stream, they may have thought the product seemed simple. Two things would usually be happening: either a game would be going on, or the broadcast talent would be discussing a game, possibly with some graphics illustrating their talking points.\nBut what people didn\'t see were the dozens of people who worked tirelessly, countless hours backstage to deliver that seemingly simple product.'                     
    },
    { 
      imageSrc: 'src/assets/images/img-news/baca.png',
      title: 'Rumors',
      description: 'Sources: Koi Academy player Baca 🇵🇹 has reached a verbal agreement with UCAM 🇪🇸 and will be the Superliga organization\'s midlaner next year.',
    },
    { 
      imageSrc: 'src/assets/images/img-news/crusher.jpeg',
      title: 'Rumors',
      description: 'Sources: Crusher 🇵🇹 has reached a verbal agreement with Ucam 🇪🇸 and will be the head coach of the Murcia organization.',
    },
    { 
      imageSrc: 'src/assets/images/img-news/isma.jpeg',
      title: 'Rumors',
      description: 'Sources: Isma 🇫🇷 has reached a verbal agreement with Gentle Mates 🇫🇷 and will be the jungler for the LFL team in case he doesn\'t receive LEC offer.',
    },
    { 
      imageSrc: 'src/assets/images/img-news/perkz.jpeg',
      title: 'Rumors',
      description: 'Sources: Team Vitality 🇫🇷 has reached a verbal agreement with Perkz 🇭🇷 to part ways.',
    },
    { 
      imageSrc: 'src/assets/images/img-news/solary.jpeg',
      title: 'Rumors',
      description: 'Sources : Solary 🇫🇷 has reached a verbal agreement with Decay 🇫🇷 and he is expected to be the midlaner of the team.',
    }
    
  ];

}
