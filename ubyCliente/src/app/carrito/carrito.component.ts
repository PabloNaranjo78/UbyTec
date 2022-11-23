import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../interfaces/pedido';
import { Producto, ProductoFotos, ProductoPedido } from '../interfaces/producto';
import { PedidosService } from '../services/pedidos.service';
import { ProductosFotosService, ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  lista:Producto[]=[]
  comercio:string  = ""
  productos:ProductoPedido[] = []
  objeto!:Producto;
  downloading:boolean = false
  loading:boolean = false
  listaFotos:ProductoFotos[] = []
  productoFoto:ProductoFotos = new ProductoFotos()
  temporal:ProductoPedido = new ProductoPedido()

  constructor(private service:ProductosService,private fotosService:ProductosFotosService,private pedidoService:PedidosService, private rou:ActivatedRoute) {
    this.comercio = this.rou.snapshot.params['comercio']
    this.service.get("Comercio", this.comercio).subscribe({
      next: (data) =>{
        this.lista = data
      }
    })
   }

   onAddProducto(){
    console.log(this.temporal)
    let pro = new ProductoPedido()
    pro.cantidad = this.temporal.cantidad
    pro.precio = this.temporal.precio
    pro.producto = this.temporal.producto
    this.productos.push(pro)
   }

   onSolicitarPedido(){
    let pedido = new Pedido()
    pedido.idCliente = this.rou.snapshot.params['id']
    pedido.direccion = "carbiarla"
    pedido.comprobante = "solicitar"
    pedido.finalizado = "Solicitado"
    pedido.idPedido = Math.floor(Math.random() * (30000 - 10000 + 1) ) + 10000;
    console.log(pedido)
    this.pedidoService.add(pedido).subscribe({
      next: (data) => {
        console.log(data)
      } 
    })

   }
   getTotal(){
    let total = 0;
    for(let i=0; i < this.productos.length; i++){
      total= total + this.productos[i].precio * this.productos[i].cantidad 
    }
    return total
   }

   onSelectProducto(obj:Producto){
    this.objeto = obj
    this.downloading = true
    this.temporal.precio = obj.precio
    this.temporal.producto = obj.nombre
    this.temporal.cantidad = 1
    this.fotosService.get(this.objeto.nombre).subscribe({
      next: (data) =>{
        console.log(data)
        this.listaFotos = data
        this.downloading = false
      }
    })
   }










  ngOnInit(): void {
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

}
