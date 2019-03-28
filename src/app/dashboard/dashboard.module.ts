import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { AppCommonModule } from '../common/common.module';
import { HomeComponent } from './home/home.component';
import { SeriesCardListComponent } from './series-card-list/series-card-list.component';
import { SeriesCardComponent } from './series-card/series-card.component';
import { SeriesSearchComponent } from './series-search/series-search.component';
import { TabItemComponent } from './tab-item/tab-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SeriesCardListComponent,
    SeriesCardComponent,
    TabItemComponent,
    HomeComponent,
    SeriesSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    // app modules
    AppCommonModule,
    AuthModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class DashboardModule {}
