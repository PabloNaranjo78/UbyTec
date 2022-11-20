import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../interfaces/comercio';
import { Pedido } from '../interfaces/pedido';
import { ComerciosService } from '../services/comercios.service';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  lista:Comercio[]=[]
  id!:number|string;
  
  comprasRecientes:Pedido[]=[]

  constructor(private rou:ActivatedRoute, private service: ComerciosService, private pedidosService:PedidosService) {
    this.id = this.rou.snapshot.params['id']
    service.getList().subscribe({
      next: (data) => {
        this.lista = data
      }
    })
    pedidosService.getList().subscribe({
      next: (data) => {
        for (let i = 0; i<data.length; i++){
          if (this.comprasRecientes.length<11){
            this.comprasRecientes.push(data[i])
        }
        }
      }
    })
  }

  ngOnInit(): void {
  }

    /*Crea filas de 5 unidades a partir de índice
  valor:number
  return: boolean*/
  crearFila(valor:number){
    if (valor%3==0){
      return true;
    }
    return false;
  }
  /*Rellena la lista con elementos nulos para conservar el espaciado
  valor:number
  return: list*/
  subLista(valor:number){
    var sub=[];
    if(valor+3 > this.lista.length){
      sub = this.lista.slice(valor)
    } else {
      sub = this.lista.slice(valor, valor+3);
    }
    return sub;
  }

  completar(valor:number){
    var sub=[1,2,3];
    if(valor+3 > this.lista.length){
       return sub.slice(0,valor+3-this.lista.length)
    } else {
      return []
    }
  }

  


}
