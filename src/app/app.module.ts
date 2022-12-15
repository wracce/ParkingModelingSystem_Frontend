import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
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
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule, CdkScrollableModule} from '@angular/cdk/scrolling';
import { AdministratorComponent } from './administrator/administrator.component';
import { ManagerComponent } from './manager/manager.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { DesignerConfirmComponent } from './designer/components/designer-confirm/designer-confirm.component';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulationSetupComponent } from './simulation/components/simulation-setup/simulation-setup.component';
import {LoginService} from "./core/service/login.service";
import {AuthGuard} from "./core/guard/auth.guard";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";






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
    AdministratorComponent,
    ManagerComponent,
    DesignerConfirmComponent,
    SimulationComponent,
    SimulationSetupComponent,

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
    ReactiveFormsModule,
    ScrollingModule,
    CdkMenuModule,
    CdkScrollableModule,
    MatListModule,
    NgxMaterialTimepickerModule,
    HttpClientModule
  ],
  providers: [
    DesignerService,
    LoginService,
    AuthGuard,
    HttpClient,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
