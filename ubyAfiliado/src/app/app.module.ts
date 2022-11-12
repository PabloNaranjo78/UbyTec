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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "", component:LoginComponent},
      {path: ":id/gestion-productos", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: ":id/nuevo-admin", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: ":id/gestion/pedidos", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: "login", component:LoginComponent}
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
