import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  lista:Producto[]=[]
  id:number = 0

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

  constructor() { }

  ngOnInit(): void {
  }

}
