import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado, EmpleadoInterface } from '../interfaces/empleado';
import { ConexionService } from './conexion.service';
import { Gestion } from '../interfaces/gestion';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends ConexionService<EmpleadoInterface> {
  listaG:Gestion[]=[]
  listaA:Empleado[]=[]
  objeto:Empleado[]=[];
  getResourceURL(): string {
    return "/Empleado"
  }
  getHomePage(): string {
    return 'gestion/empleado'
  }
  getNombre(): string {
    return "Empleado"
  }

  getAsInterface(): Gestion[]{
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaG.push(
          {nombre: data[i].nombre,
            id: data[i].idEmpleado,
            route:data[i].nombre}
          )
      }
    })
    return this.listaG;
  }

  onGetList(): Empleado[]{
    this.getList().subscribe((data) =>{
      for (let i =0; i<data.length;i++){
        this.listaA.push(data[i])
      }
    })
    return this.listaA
  }

  onGet(id: string | number, marca?:string | number):Empleado{
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
