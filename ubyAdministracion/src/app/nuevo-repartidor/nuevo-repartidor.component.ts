import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Empleado} from '../interfaces/empleado';
import { Telefono, TelefonoInterface } from '../interfaces/genericas';
import {Repartidor} from '../interfaces/repartidor';
import { RepartidoresService } from '../services/repartidores.service';
import { DireccionesService, TelefonosService } from '../services/telefonos.service';

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

  provincias:string[] = [];
  cantones:string[] = [];
  distritos:string[] = [];
  provincia: any;
  canton: any;

  constructor(private service:RepartidoresService, private telefonosService:TelefonosService ,private direccionesService:DireccionesService, private route:Router, private rou:ActivatedRoute) {
    this.telefonosService.url = "RepartidorTelefonos";
    this.telefonosService.nombre = "Telefono de Repartidor";
  }

  ngOnInit(): void {
    this.telefonosService.url = "RepartidorTelefonos";
    this.telefonosService.nombre = "Telefono de Repartidor";
    if(this.rou.snapshot.params['id']==undefined){
      this.getProvincia();
      this.editMode = false;
      this.telefonosService.homePage = "nuevo/repartidores";
    } else {
      this.telefonosService.homePage = "actualizar/repartidores/"+this.rou.snapshot.params['id'];
      this.service.get(this.rou.snapshot.params['id']).subscribe({
        /*Mensaje emergente de exito*/
        next: (data) => {
          this.objeto = data[0];
          this.getProvincia();
          this.getCanton();
          this.getDistrito();
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
  }

  onDeleteTelefono(tel:TelefonoInterface){
    this.telefonosService.onEliminar(tel.id, tel.telefono)

  }

  //Provincias,cantones,distritos
  getProvincia(){
    this.direccionesService.get("Provincia").subscribe({
      next: (data) => {
        this.provincias = data;
      }
    })
  }

  getCanton(){
    this.direccionesService.get(this.objeto.provincia).subscribe({
      next: (data) => {
        this.cantones = data;
      }
  })
}

  getDistrito(){
    this.direccionesService.get(this.objeto.provincia,this.objeto.canton).subscribe({
      next: (data) => {
        this.distritos = data;
      }
  })
}

selected(){
  this.getCanton();
}

selectedcant(){
  this.getDistrito();
}

}

