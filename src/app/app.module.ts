import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DragDropModule} from '@angular/cdk/drag-drop';



import { NavbarComponent } from './view/navbar/navbar.component';
import { DesignerComponent } from './view/designer/designer.component';
import { AuthComponent } from './view/auth/auth.component';
import { AboutComponent } from './view/about/about.component';
import { NfComponent } from './view/nf/nf.component';
import { HomeComponent } from './view/home/home.component';
import { ParkDesignerComponent } from './view/designer/park-designer/park-designer.component';
import { DesignerService } from './view/designer/designer.service';
import { ParkObjectsComponent } from './view/designer/park-objects/park-objects.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DesignerComponent,
    AuthComponent,
    AboutComponent,
    NfComponent,
    HomeComponent,
    ParkDesignerComponent,
    ParkObjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    DragDropModule
  ],
  providers: [DesignerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
