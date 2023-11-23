import { Component } from '@angular/core';


@Component({
  selector: 'app-esports',
  templateUrl: './esports.component.html',
  styleUrls: ['./esports.component.css']
})
export class EsportsComponent {

  mainGridData = [

    { title: 'VCT Pacific', items: [
      { 
        subtitle: 'T1',
        imageSrc: 'src/assets/images/img-esports/t1.png'
      },
      { 
        subtitle: 'Talon Esports',
        imageSrc: 'src/assets/images/img-esports/talon.png'
      },
      { 
        subtitle: 'Gen G',
        imageSrc: 'src/assets/images/img-esports/geng.png'
      },
      { 
        subtitle: 'PRX',
        imageSrc: 'src/assets/images/img-esports/prx.png'
      },
      { 
        subtitle: 'DRX',
        imageSrc: 'src/assets/images/img-esports/drx.png'
      }
      ] },

    { title: ' VCT Americas', items: [
      { 
        subtitle: 'LOUD',
        imageSrc: 'src/assets/images/img-esports/loud.png'
      },
      { 
        subtitle: 'LEVIATAN',
        imageSrc: 'src/assets/images/img-esports/lev.png'
      },
      { 
        subtitle: 'KRU',
        imageSrc: 'src/assets/images/img-esports/kru.png'
      },
      { 
        subtitle: 'EVIL GENUISES',
        imageSrc: 'src/assets/images/img-esports/eg.png'
      },
      { 
        subtitle: 'NRG',
        imageSrc: 'src/assets/images/img-esports/nrg.png'
      }] },

    { title: 'VCT Emea', items: [
      { 
        subtitle: 'KOI',
        imageSrc: 'src/assets/images/img-esports/koi.png'
      },
      { 
        subtitle: 'TEAM HERETICS',
        imageSrc: 'src/assets/images/img-esports/heretics.png'
      },
      { 
        subtitle: 'FNATIC',
        imageSrc: 'src/assets/images/img-esports/fnatic.png'
      },
      { 
        subtitle: 'GIANTS',
        imageSrc: 'src/assets/images/img-esports/giants.png'
      },
      { 
        subtitle: 'NAVI',
        imageSrc: 'src/assets/images/img-esports/navi.png'
      }] },

    { title: 'VCT China', items: [
      { 
        subtitle: 'EDG',
        imageSrc: 'src/assets/images/img-esports/edg.png'
      },
      { 
        subtitle: 'BLG',
        imageSrc: 'src/assets/images/img-esports/blg.png'
      },
      { 
        subtitle: 'TEAM WEIBO',
        imageSrc: 'src/assets/images/img-esports/wg.png'
      },
      { 
        subtitle: 'FPX',
        imageSrc: 'src/assets/images/img-esports/fpx.png'
      },
      { 
        subtitle: 'TYLOO',
        imageSrc: 'src/assets/images/img-esports/tyloo.png'
      }] },
   
  ];

}
