import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { HeaderComponent } from './header/header.component';
import { VigilanteGuard } from './vigilante.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    HeaderComponent,
    PerfilComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", component:LoginComponent, canActivate:[VigilanteGuard]},
      {path: "gestion/:Tipo", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: ":id/nuevo-admin", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: ":id/gestion/pedidos", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: "login", component:LoginComponent},
      {path: "gestion/perfil/:id", component:PerfilComponent, canActivate: [VigilanteGuard]},
      {path: "admin", component:AdminComponent, canActivate: [VigilanteGuard]}
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
