import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Empleado} from '../interfaces/empleado';
import { Telefono, TelefonoInterface } from '../interfaces/genericas';
import {Repartidor} from '../interfaces/repartidor';
import { RepartidoresService } from '../services/repartidores.service';
import { TelefonosService } from '../services/telefonos.service';

@Component({
  selector: 'app-nuevo-repartidor',
  templateUrl: './nuevo-repartidor.component.html',
  styleUrls: ['./nuevo-repartidor.component.css']
})
export class NuevoRepartidorComponent implements OnInit {

  objeto: Repartidor = new Repartidor();
  editMode:boolean = true;

  telefonoNuevo:Telefono = new Telefono();
  listaTelefonos:Telefono[] = [];

  constructor(private service:RepartidoresService, private telefonosService:TelefonosService ,private route:Router, private rou:ActivatedRoute) { 
    this.telefonosService.url = "RepartidorTelefonos";
    this.telefonosService.nombre = "Telefono de Repartidor";
  }

  ngOnInit(): void {
    this.telefonosService.url = "RepartidorTelefonos";
    this.telefonosService.nombre = "Telefono de Repartidor";
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false;
      this.telefonosService.homePage = "nuevo/repartidores";
    } else {
      this.telefonosService.homePage = "actualizar/repartidores/"+this.rou.snapshot.params['id'];
      this.service.get(this.rou.snapshot.params['id']).subscribe({
        /*Mensaje emergente de exito*/
        next: (data) => {
          this.objeto = data[0];
        },
        /*Mensaje emergente de error*/
        error: (err) =>{
          this.service.avisoError(err.error)}
      });
    }
  }

  onGuardar(){
    if (this.editMode){
      this.service.onActualizar(this.objeto,this.objeto.nombre)
    } else {
      this.service.onNuevo(this.objeto,this.objeto.nombre)
    }
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.usuario)
  }

  

  onTelefonos(){
    this.telefonosService.get(this.objeto.usuario).subscribe({
      /*Mensaje emergente de exito*/
      next: (data) => {
        this.listaTelefonos = data;
      },
      /*Mensaje emergente de error*/
      error: (err) =>{
        this.service.avisoError(err.error)}
    })
  }

  onAddTelefono(){
    this.telefonoNuevo.id = this.objeto.usuario
    this.telefonosService.onNuevo(this.telefonoNuevo,this.telefonoNuevo.telefono)
    // kcnsjcf
  }

  onDeleteTelefono(tel:TelefonoInterface){
    this.telefonosService.onEliminar(tel.id, tel.telefono)
    //mcsjhfnjednf
  }
  

}

