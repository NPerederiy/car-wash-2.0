import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceListItemComponent } from './service-list-item/service-list-item.component';
import { CalendarCarouselComponent } from './calendar-carousel/calendar-carousel.component';
import { CalendarCarouselItemComponent } from './calendar-carousel-item/calendar-carousel-item.component';
import { BoxListComponent } from './box-list/box-list.component';
import { BoxListItemComponent } from './box-list-item/box-list-item.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    ServiceListComponent,
    ServiceListItemComponent,
    CalendarCarouselComponent,
    CalendarCarouselItemComponent,
    BoxListComponent,
    BoxListItemComponent,
    TimeBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
