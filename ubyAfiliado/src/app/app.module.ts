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
import { NuevoAfiliadoComponent } from './nuevo-afiliado/nuevo-afiliado.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { NuevoAfiliadoAdminComponent } from './nuevo-afiliado-admin/nuevo-afiliado-admin.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    HeaderComponent,
    NuevoAfiliadoComponent,
    NuevoAfiliadoAdminComponent,
    SolicitudComponent,
    NuevoProductoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", component:LoginComponent, canActivate:[VigilanteGuard]},
      {path: "gestion/:Tipo", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: ":id/nuevo-admin", component:NuevoAfiliadoAdminComponent, canActivate: [VigilanteGuard]},
      {path: ":id/solicitud", component:SolicitudComponent, canActivate: [VigilanteGuard]},
      {path: ":id/gestion/pedidos", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: "login", component:LoginComponent},
      {path: ":id/gestion/perfil", component:NuevoAfiliadoComponent, canActivate: [VigilanteGuard]}
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
