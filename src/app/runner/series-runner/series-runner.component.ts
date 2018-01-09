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
import { ISeries, Series } from '../../common/model/series';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { SeriesService } from '../../common/series.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProgrammingLanguage } from '../../common/model/programming-language';
import { Store } from '@ngrx/store';
import * as st from '../../store';
import { Observable } from 'rx-lite';

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
  series$: Store<ISeries>;

  animationInProgress = false;
  lastExId = '';

  constructor(
    private route: ActivatedRoute,
    private seriesServies: SeriesService,
    private store: Store<st.RunnerState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((data: { id: string }) => this.seriesServies.get(data.id))
      .subscribe((series: Series) => {
        this.series = series;
      });
    this.series$ = this.store.select(st.getSeries);
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
  }
}
