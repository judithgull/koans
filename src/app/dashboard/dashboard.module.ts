import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { HomeComponent } from './home/home.component';
import { AdminModule } from '../admin/admin.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    // app modules
    AppCommonModule,
    AdminModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class DashboardModule {}
