import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MiniProfilerInterceptor, MiniProfilerModule } from 'ng-miniprofiler';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    MiniProfilerModule.forRoot({
      baseUri: 'https://localhost:7285',
      colorScheme: 'Auto',
      maxTraces: 15,
      position: 'BottomRight',
      toggleShortcut: 'Alt+M',
      enabled: true,
      enableGlobalMethod: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MiniProfilerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
