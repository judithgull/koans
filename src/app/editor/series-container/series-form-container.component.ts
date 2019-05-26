import { Component, OnInit } from '@angular/core';
import { SeriesFacade } from '../../store';
import { ISeries } from '../../model';
import { Observable } from 'rxjs';
import { UserFacade } from '../../store/user/user.facade';
import { IUser } from '../../model/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-series-form-container',
  template: `
    <app-series-form
      [model]="series$ | async"
      [author]="author$ | async"
      (submitSeries)="submitSeries($event)"
    >
    </app-series-form>
  `
})
export class SeriesFormContainerComponent implements OnInit {
  series$: Observable<ISeries>;
  author$: Observable<IUser>;
  constructor(
    private seriesFacade: SeriesFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.series$ = this.seriesFacade.selectedSeries$.pipe(
      map(s => {
        return s ? s : this.createEmptySeries();
      })
    );
    this.author$ = this.userFacade.currentUser$;
  }

  private createEmptySeries(): ISeries {
    return {
      title: '',
      authorId: '',
      programmingLanguage: 'typescript',
      items: [
        {
          sortOrder: 1,
          title: '',
          description: '',
          exercise: '',
          solution: ''
        }
      ]
    };
  }

  submitSeries(s: ISeries) {
    this.seriesFacade.upsert(s);
  }
}
