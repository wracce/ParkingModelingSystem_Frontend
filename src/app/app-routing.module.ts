import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './view/about/about.component';
import { AuthComponent } from './view/auth/auth.component';
import { DesignerComponent } from './view/designer/designer.component';
import { HomeComponent } from './view/home/home.component';
import { NfComponent } from './view/nf/nf.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "auth", component: AuthComponent},
  { path: "designer", component: DesignerComponent},
  { path: "**", component: NfComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
