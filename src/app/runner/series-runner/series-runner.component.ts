import '../../../rx-index.ts';
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
  group,
  animateChild
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { Series } from '../../common/model/series';
import { SeriesService } from '../../common/series.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProgrammingLanguage } from '../../common/model/programming-language';

@Component({
  selector: 'app-series-runner',
  templateUrl: './series-runner.component.html',
  styleUrls: ['./series-runner.component.scss'],
  animations: [
    trigger('cardTransition', [
      transition('1 -> 2', [
        style({ transform: 'translateX(200px)', opacity: 0 })
      ])
    ])
  ]
})
export class SeriesRunnerComponent implements OnInit {
  series: Series;

  animationInProgress = false;
  lastExId = '';

  constructor(
    private route: ActivatedRoute,
    private seriesServies: SeriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((data: { id: string }) => this.seriesServies.get(data.id))
      .subscribe((series: Series) => {
        this.series = series;
      });

    this.router.events
      .filter(e => e.constructor.name === 'RoutesRecognized')
      .pairwise()
      .subscribe((e: any[]) => {
        console.log(e);
        //            this.storage.set('referrer', e[0].urlAfterRedirects);
      });
  }

  getIcon(programmingLanguage: string) {
    if (
      ProgrammingLanguage.typescript ===
      ProgrammingLanguage[programmingLanguage]
    ) {
      return 'assets/icon-typescript.svg';
    }
    return 'assets/icon-javascript.svg';
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  getAnimation() {
    return 'fadeIn';
  }

  prepRouteState(outlet: RouterOutlet) {
    if (!outlet.isActivated) {
      console.log('empty');
    } else {
      return outlet.activatedRoute.params['value']['exId'];
    }
    // console.log(window.location.pathname);
    // return;
    // return outlet.activatedRouteData['animation'] || 'firstPage';
    // return 'fadeIn';
  }
}
