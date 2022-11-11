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
      {path: "", component:LoginComponent, canActivate: [VigilanteGuard]},
      {path: "gestion/:Tipo", component:GestionesComponent, canActivate: [VigilanteGuard]},
      {path: "login", component:LoginComponent},
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
