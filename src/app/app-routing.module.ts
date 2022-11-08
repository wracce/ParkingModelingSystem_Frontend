import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DesignerComponent } from './designer/designer.component';
import { HomeComponent } from './home/home.component';
import { NfComponent } from './nf/nf.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "auth", component: AuthComponent},
  { path: "administrator", component: AdministratorComponent},
  { path: "designer", component: DesignerComponent},
  { path: "**", component: NfComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
