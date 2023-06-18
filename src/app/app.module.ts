import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedCardComponent } from '../common/feed-card/feed-card.component';
import { HomePageComponent } from '../screens/home-page/home-page.component';
import { ToolbarComponent } from '../screens/home-page/toolbar/toolbar.component';
import { TabularDisplayComponent } from '../screens/home-page/tabular-display/tabular-display.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { DropdownComponent } from '../common/dropdown/dropdown.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { EmptyListComponent } from '../common/empty-list/empty-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    HomePageComponent,
    ToolbarComponent,
    TabularDisplayComponent,
    PaginationComponent,
    DropdownComponent,
    NavbarComponent,
    EmptyListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
