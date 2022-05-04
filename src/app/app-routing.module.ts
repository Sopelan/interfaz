import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotasFinalesComponent } from './notas-finales/notas-finales.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  //{path: 'perfil',component: HomeComponent},
  {path: 'notasFinales',component: NotasFinalesComponent},
{path: '**',redirectTo: '',pathMatch: "full"}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
