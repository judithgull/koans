import { NgModule } from '@angular/core';
import { AccountComponent } from './widgets/account/account.component';
import { IntroTextComponent } from './widgets/intro-text/intro-text.component';
import { SeriesCardComponent } from './widgets/series-card/series-card.component';
import { SeriesCardListComponent } from './widgets/series-card-list/series-card-list.component';
import { AppCommonModule } from '../common';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AccountComponent,
    IntroTextComponent,
    SeriesCardComponent,
    SeriesCardListComponent
  ],
  exports: [AccountComponent, IntroTextComponent, SeriesCardListComponent],
  imports: [AppCommonModule, CommonModule]
})
export class AdminModule {}
