import { NgModule } from '@angular/core';
import { AccountComponent } from './widgets/account/account.component';
import { IntroTextComponent } from './widgets/intro-text/intro-text.component';
import { SeriesCardComponent } from './widgets/series-card/series-card.component';
import { SeriesCardListComponent } from './widgets/series-card-list/series-card-list.component';
import { AppCommonModule } from '../common';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './widgets/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AccountComponent,
    IntroTextComponent,
    SeriesCardComponent,
    SeriesCardListComponent,
    DashboardComponent
  ],
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    AppCommonModule,
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [DashboardComponent]
})
export class AdminModule {}
