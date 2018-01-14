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
import { ISeries } from '../../common/model/series';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProgrammingLanguage } from '../../common/model/programming-language';
import { Store } from '@ngrx/store';
import * as st from '../store';
import { LoadExerciseUserState } from '../store/actions/exercise.action';

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
  series$: Store<ISeries>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<st.RunnerState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: { id: string }) => {
      this.store.dispatch(new st.LoadSeries(data.id));
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
