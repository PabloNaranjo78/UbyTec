import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ComercioInterface } from '../interfaces/comercio';
import { Gestion } from '../interfaces/gestion';
import { ConexionService } from './conexion.service';


  
@Injectable({
  providedIn: 'root'
})
export class ComerciosService extends ConexionService<ComercioInterface>{
  listaG:Gestion[]=[];  
  id!: number;
  getResourceURL(): string {
    return "/Comercio"
  }
  getHomePage(): string {
    return this.id + '/gestion/perfil'
  }
  getNombre(): string {
    return "Comercio"
  }

  getAsInterface(solicitud?:boolean): Gestion[]{
    this.listaG = []
    console.log(solicitud)
    if (solicitud){
      this.get("solicitudes").subscribe((data) =>{
        for (let i =0; i<data.length;i++){
          this.listaG.push(
            {nombre: data[i].nombre,
              id: data[i].idComercio,
              route:data[i].nombre}
            )
        }
      })
    } else {
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].idComercio,
            route:data[i].nombre}
          )
      }
    })}
    return this.listaG;
  }

  constructor(protected override httpClient: HttpClient, protected override route:Router) {
    super(httpClient, route);
  }
}

