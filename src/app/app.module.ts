import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DragDropModule} from '@angular/cdk/drag-drop';



import { NavbarComponent } from './navbar/navbar.component';
import { DesignerComponent } from './designer/designer.component';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { NfComponent } from './nf/nf.component';
import { HomeComponent } from './home/home.component';
import { DesignerParkingComponent } from './designer/components/designer-parking/designer-parking.component';
import { DesignerService } from './designer/services/designer.service';
import { DesignerSetupComponent } from './designer/components/designer-setup/designer-setup.component';
import {MatTreeModule} from '@angular/material/tree';
import { DesignerTemplatesComponent } from './designer/components/designer-templates/designer-templates.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AdministratorComponent } from './administrator/administrator.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DesignerComponent,
    AuthComponent,
    AboutComponent,
    NfComponent,
    HomeComponent,
    DesignerParkingComponent,
    DesignerSetupComponent,
    DesignerTemplatesComponent,
    AdministratorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    DragDropModule,
    MatTreeModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatSelectModule,
    FormsModule,
    ScrollingModule
    

  ],
  providers: [DesignerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
