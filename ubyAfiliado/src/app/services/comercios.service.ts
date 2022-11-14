import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComercioInterface } from '../interfaces/comercio';
import { Gestion } from '../interfaces/gestion';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService extends ConexionService<ComercioInterface>{
  listaG:Gestion[]=[]
  id!: number;
  getResourceURL(): string {
    return "/Comercio"
  }
  getHomePage(): string {
    return 'gestion/perfil/'+ this.id
  }
  getNombre(): string {
    return "Comercio"
  }

  getAsInterface(): Gestion[]{
    this.listaG = []
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].idComercio,
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


@Injectable({
  providedIn: 'root'
})
export class ComerciosAdminService extends ConexionService<ComercioInterface>{
  listaG:Gestion[]=[]
  getResourceURL(): string {
    return "/Solicitudes"
  }
  getHomePage(): string {
    return 'gestion/afiliados'
  }
  getNombre(): string {
    return "Comercio"
  }

  getAsInterface(): Gestion[]{
    this.listaG = []
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].idComercio,
            route:data[i].nombre}
          )
      }
    })
    return this.listaG;
  }

  constructor(protected override httpClient: HttpClient, protected override route:Router) {
    super(httpClient, route);
  }}
