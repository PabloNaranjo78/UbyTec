import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { HeaderComponent } from './header/header.component';
import { VigilanteGuard } from './vigilante.guard';
import { NuevoEmpleadoComponent } from './nuevo-empleado/nuevo-empleado.component';
import { NuevoRepartidorComponent } from './nuevo-repartidor/nuevo-repartidor.component';
import { NuevoAfiliadoComponent } from './nuevo-afiliado/nuevo-afiliado.component';
import { NuevoAfiliadoAdminComponent } from './nuevo-afiliado-admin/nuevo-afiliado-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    HeaderComponent,
    NuevoEmpleadoComponent,
    NuevoRepartidorComponent,
    NuevoAfiliadoComponent,
    NuevoAfiliadoAdminComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", component:LoginComponent, canActivate: [VigilanteGuard]},
      {path: "gestion/:Tipo", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: "login", component:LoginComponent},
      {path: "nuevo/empleado", component:NuevoEmpleadoComponent, canActivate: [VigilanteGuard]},
      {path: "nuevo/repartidor", component:NuevoRepartidorComponent, canActivate: [VigilanteGuard]},
      {path: "nuevo/afiliado", component:NuevoAfiliadoComponent, canActivate: [VigilanteGuard]},
      {path: "nuevo/afiliadoAdmin", component:NuevoAfiliadoAdminComponent, canActivate: [VigilanteGuard]},
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
