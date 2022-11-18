import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reporte, ReporteInterface } from '../interfaces/reporte';
import { ReportesService } from '../services/reportes.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reporte1:Reporte[] = [];
  reporte2:Reporte[] = [];
  reporte3:Reporte[] = [];
  listaclientes:Cliente[] = [];
  listaafiliados:Afiliado[] = [];


  constructor(private rou:ActivatedRoute, private route:Router, private reportesService:ReportesService) { }

  ngOnInit(): void {
    this.reportesService.get('ConsolidadoVentas').subscribe({
      next: data => {
        this.reporte1=data;
        this.sumreporte1();
        console.log(this.reporte1)
      }
    })
    this.reportesService.get('VentasAfiliado').subscribe({
      next: data => {
        this.reporte2=data
        this.sumreporte2();
        console.log(this.reporte2)
      }
    })
  }
  sumreporte1(){
    let añadido:boolean = false;
    for(let i = 0; i < this.reporte1.length; i++){
      añadido = false;
      for(let j = 0; j < this.listaclientes.length; j++){
        if(this.reporte1[i].cliente == this.listaclientes[j].cliente){
          this.listaclientes[j].añadirdetalle(this.reporte1[i]);
          añadido = true;
        }
      }
      if(!añadido){
        this.listaclientes.push(new Cliente(this.reporte1[i].cliente, this.reporte1[i]))
    }
  }
}
  sumreporte2(){
    let añadido2:boolean = false;
    for (let i = 0; i < this.reporte2.length; i++) {
      for(let j = 0; j < this.listaafiliados.length; j++){
        if(this.reporte2[i].afiliado == this.listaafiliados[j].afiliado){
          this.listaafiliados[j].añadirdetalle2(this.reporte2[i]);
          añadido2 = true;
        }
      }
      if(!añadido2){
        this.listaafiliados.push(new Afiliado(this.reporte2[i].afiliado, this.reporte2[i]))
    }
  }
}
}


class Cliente{
  cliente!: string;
  totalcomprasT:number = 0;
  MontoTotalT:number = 0;
  MontoServicioT:number = 0;

  detalles:Reporte[]=[]

  constructor(cliente:string, detalle:Reporte){
    this.cliente = cliente;
    this.añadirdetalle(detalle)
  }

  añadirdetalle(detalle:Reporte){
    this.totalcomprasT += detalle.compras;
    this.MontoTotalT += detalle.monto_total;
    this.MontoServicioT += detalle.monto_servicio;
    this.detalles.push(detalle)
  }
}


class Afiliado{
  afiliado!: string;
  totalcomprasS:number = 0;
  MontoTotalS:number = 0;
  MontoServicioS:number = 0;

  detalles2:Reporte[]=[]

  constructor(afiliado:string, detalle2:Reporte){
    this.afiliado = afiliado;
    this.añadirdetalle2(detalle2)
  }

  añadirdetalle2(detalle2:Reporte){
    this.totalcomprasS += detalle2.compras;
    this.MontoTotalS += detalle2.monto_total;
    this.MontoServicioS += detalle2.monto_servicio;
    this.detalles2.push(detalle2)
  }
}
