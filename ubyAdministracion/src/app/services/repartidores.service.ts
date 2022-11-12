import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Gestion } from '../interfaces/gestion';
import { Repartidor, RepartidorInterface } from '../interfaces/repartidor';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class RepartidoresService extends ConexionService<RepartidorInterface>{
  listaG:Gestion[]=[]
  listaA:Repartidor[]=[]
  objeto:Repartidor[]=[];
  getResourceURL(): string {
    return "/Repartidor"
    //api repartidor
  }
  getHomePage(): string {
    return 'gestion/repartidores'
  }
  getNombre(): string {
    return "Repartidor"
  }

  getAsInterface(): Gestion[]{
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].usuario,
            route:data[i].nombre}
          )
      }
    })
    return this.listaG;
  }

  onGetList(): Repartidor[]{
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaA.push(data[i])
      }
    })
    return this.listaA
  }

  onGet(id: string | number, marca?:string | number):Repartidor{
    if (marca){
      this.get(id, marca).subscribe((data) =>{
        console.log(data)
        this.objeto.push(data[0])
      });
    }
    this.get(id).subscribe((data) =>{
      this.objeto.push(data[0])
      console.log(this.objeto)
    });
    return this.objeto[0]
  }

  constructor(protected override httpClient: HttpClient, protected override route:Router) {
    super(httpClient, route);
  }

}
