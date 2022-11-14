import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Gestion } from '../interfaces/gestion';
import { ProductoInterface } from '../interfaces/producto';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends ConexionService<ProductoInterface>{
  listaG:Gestion[]=[]
  getResourceURL(): string {
    return "/Producto"
    //api producto
  }
  getHomePage(): string {
    return 'gestion/productos'
  }
  getNombre(): string {
    return "Producto"
  }

  getAsInterface(): Gestion[]{
    this.listaG=[];
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].nombre,
            route:data[i].nombre}
          )
      }
    })
    return this.listaG;
  }

  constructor(protected override httpClient: HttpClient, protected override route:Router) {
    super(httpClient, route);
  }

}
