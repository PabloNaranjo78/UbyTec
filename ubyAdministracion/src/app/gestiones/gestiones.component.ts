import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gestion } from '../interfaces/gestion';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent implements OnInit {
  Tipo:string="";
  lista:gestion[]=[]
  constructor(private route:Router, private rou:ActivatedRoute) {
    this.Tipo = this.rou.snapshot.params['Tipo']
    console.log(this.Tipo)

    if(this.rou.snapshot.params['Tipo'] == "empleado")

    {
      this.lista=[{
        nombre: "Juan",
        id: 123,
        route: "empleados"
    },
    {
      nombre: "KFC",
      id: 321,
      route: "afiliados"
    },
    {
      nombre: "Axel",
      id: 12,
      route: "repartidores"
    }]
    }
    console.log(this.lista)
   }



    /*Crea filas de 5 unidades a partir de índice
  valor:number
  return: boolean*/
  crearFila(valor:number){
    if (valor%5==0){
      return true;
    }
    return false;
  }
  /*Rellena la lista con elementos nulos para conservar el espaciado
  valor:number
  return: list*/
  subLista(valor:number){
    var sub=[];
    if(valor+5 > this.lista.length){
      sub = this.lista.slice(valor)
    } else {
      sub = this.lista.slice(valor, valor+5);
    }
    return sub;
  }

  completar(valor:number){
    var sub=[1,2,3,4,5];
    if(valor+5 > this.lista.length){
       return sub.slice(0,valor+5-this.lista.length)
    } else {
      return []
    }
  }

  ngOnInit(): void {

  }

}
