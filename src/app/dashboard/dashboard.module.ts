import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { AdminModule } from '../admin/admin.module';
import { HomeComponent } from '../admin/widgets/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [],
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
