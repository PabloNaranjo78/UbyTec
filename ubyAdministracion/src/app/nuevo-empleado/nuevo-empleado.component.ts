import { Component, OnInit } from '@angular/core';
import {TelefonoInterface, Telefono} from '../interfaces/genericas';
import {Empleado } from '../interfaces/empleado';
import { EmpleadosService } from '../services/empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DireccionesService, TelefonosService } from '../services/telefonos.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {


  objeto:Empleado = new Empleado();
  editMode:boolean = true;

  telefonoNuevo:Telefono = new Telefono();
  listaTelefonos:Telefono[] = [];

  provincias:string[] = [];
  cantones:string[] = [];
  distritos:string[] = [];
  provincia: any;
  canton: any;

  able1: boolean = true;
  able2: boolean = true;



  constructor(private service:EmpleadosService, private route:Router, private rou:ActivatedRoute, protected telefonosService:TelefonosService, protected direccionesService:DireccionesService) {
    this.telefonosService.url = "EmpleadoTelefonos";
    this.telefonosService.nombre = "Telefono de Empleado";
  }

  ngOnInit(): void {
    this.telefonosService.url = "EmpleadoTelefonos";
    this.telefonosService.nombre = "Telefono de Empleado";
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false;
      this.telefonosService.homePage = "nuevo/empleado";
    } else {
      this.telefonosService.homePage = "actualizar/empleado/"+this.rou.snapshot.params['id'];
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

  onAddTelefono(){
    this.telefonoNuevo.id = this.objeto.idEmpleado
    this.telefonosService.onNuevo(this.telefonoNuevo,this.telefonoNuevo.telefono)
    // kcnsjcf
  }

  onDeleteTelefono(tel:TelefonoInterface){
    this.telefonosService.onEliminar(this.objeto.idEmpleado, tel.telefono)
    //mcsjhfnjednf
  }

  onTelefonos(){
    this.telefonosService.get(this.objeto.idEmpleado).subscribe({
      /*Mensaje emergente de exito*/
      next: (data) => {
        this.listaTelefonos = data;
      },
      /*Mensaje emergente de error*/
      error: (err) =>{
        this.service.avisoError(err.error)}
    })
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.idEmpleado)
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
  if (this.objeto.provincia != undefined){
    this.able1 = false;
    this.able2 = true;
  }
  else{
    this.able1 = true;
    this.able2 = true;
  }
}

selectedcant(){
  if (this.objeto.provincia != undefined && this.objeto.canton != undefined){
    this.able2 = false;
  }
  else{
    this.able2 = false;
  }
}

}
