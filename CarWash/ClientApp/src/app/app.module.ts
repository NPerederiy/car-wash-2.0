import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { NavMenuComponent } from './nav-menu/nav-menu.component';
// import { ServiceListComponent } from './service-list/service-list.component';
// import { ServiceListItemComponent } from './service-list-item/service-list-item.component';
// import { CalendarCarouselComponent } from './calendar-carousel/calendar-carousel.component';
// import { CalendarCarouselItemComponent } from './calendar-carousel-item/calendar-carousel-item.component';
// import { BoxListComponent } from './box-list/box-list.component';
// import { BoxListItemComponent } from './box-list-item/box-list-item.component';
// import { TimeBarComponent } from './time-bar/time-bar.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionListItemComponent } from './option-list-item/option-list-item.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ErrorProviderComponent } from './error-provider/error-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    // NavMenuComponent,
    // ServiceListComponent,
    // ServiceListItemComponent,
    // CalendarCarouselComponent,
    // CalendarCarouselItemComponent,
    // BoxListComponent,
    // BoxListItemComponent,
    // TimeBarComponent,
    OptionListComponent,
    OptionListItemComponent,
    TimePickerComponent,
    ErrorProviderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // NgbModule,
    RouterModule.forRoot([
      { path: '', component: OptionListComponent },
      { path: 'pick-time', component: TimePickerComponent },
      { path: '**', component: ErrorProviderComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
