import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [AppComponent, SearchComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: 'API_KEY',
      useValue: environment.API_KEY,
    },
    {
      provide: 'API_URL',
      useValue: environment.API_URL,
    },
    {
      provide: 'API_GEO_KEY',
      useValue: environment.API_GEO_KEY,
    },
    {
      provide: 'API_GEO_URL',
      useValue: environment.API_GEO_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
