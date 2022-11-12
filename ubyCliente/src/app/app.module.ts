import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    CrearcuentaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot([
      {path: "", component:LoginComponent}
    ]),
    FormsModule,
    HttpClientModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
