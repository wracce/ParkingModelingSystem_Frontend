import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DesignerComponent } from './designer/designer.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { NfComponent } from './nf/nf.component';
import { SimulationComponent } from './simulation/simulation.component';
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: 'full'},
  { path: "about", component: AboutComponent},
  { path: "auth", component: AuthComponent},
  { path: "administrator", component: AdministratorComponent, canActivate: [AuthGuard]},
  { path: "administrator/designer", component: DesignerComponent, canActivate: [AuthGuard]},
  { path: "manager", component: ManagerComponent, canActivate: [AuthGuard]},
  { path: "manager/simulation", component: SimulationComponent, canActivate: [AuthGuard]},
  //{ path: "**", component: NfComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
