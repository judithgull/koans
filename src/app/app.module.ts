import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditorModule } from './editor/editor.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RunnerModule } from './runner/runner.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducers, effects } from './store';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent } from './admin/widgets/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RunnerModule,
    EditorModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
