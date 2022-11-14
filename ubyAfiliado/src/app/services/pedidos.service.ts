import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Gestion } from '../interfaces/gestion';
import { PedidoInterface } from '../interfaces/pedido';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends ConexionService<PedidoInterface> {
    listaG:Gestion[]=[]
    getResourceURL(): string {
      return "/Pedido"
    }
    getHomePage(): string {
      return 'gestion/pedidos'
    }
    getNombre(): string {
      return "Pedido"
    }

    getAsInterface(): Gestion[]{
      this.listaG = []
      this.getList().subscribe((data) =>{
        for (let i =0; i<data.length;i++){
          this.listaG.push(
            {nombre: data[i].idCliente,
              id: data[i].repartidor,
              route:data[i].repartidor}
            )
        }
      })
      return this.listaG;
    }
    constructor(protected override httpClient: HttpClient, protected override route:Router) {
      super(httpClient, route);
    }
}
