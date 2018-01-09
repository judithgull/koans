import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EditorModule } from './editor/editor.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RunnerModule } from './runner/runner.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  // { path: '**', component: NotFoundComponent }
];

// not used in production -- REMOVE
export const metaReducers: Array<MetaReducer<any>> = [storeFreeze];

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    AuthModule,
    RunnerModule,
    EditorModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
