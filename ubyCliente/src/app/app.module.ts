import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { NuevoPedidioComponent } from './nuevo-pedidio/nuevo-pedidio.component';
import { VigilanteGuard } from './vigilante.guard';
import { NuevoProductoPedidoComponent } from './nuevo-producto-pedido/nuevo-producto-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionesComponent,
    CrearcuentaComponent,
    NuevoPedidioComponent,
    NuevoProductoPedidoComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot([
      {path: "", component:LoginComponent},
      {path: "nuevo/pedido", component:NuevoPedidioComponent},
      {path: "nuevo/productopedido", component:NuevoProductoPedidoComponent},
    ]),
    FormsModule,
    HttpClientModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
