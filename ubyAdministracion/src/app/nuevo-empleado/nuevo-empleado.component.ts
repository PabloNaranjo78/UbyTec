import { Component, OnInit } from '@angular/core';
import {TelefonoInterface, Telefono} from '../interfaces/genericas';
import {Empleado } from '../interfaces/empleado';
import { EmpleadosService } from '../services/empleados.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {

  telefonoNuevo:Telefono = new Telefono();
  objeto:Empleado = new Empleado();
  editMode:boolean = true;

  listaTelefonos:Telefono[] = [];


  constructor(private service:EmpleadosService, private route:Router, private rou:ActivatedRoute) { 
  }

  ngOnInit(): void {
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false;
    } else {
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
    console.log("Agregar telefono");
  }

  onDeleteTelefono(tel:TelefonoInterface){
    console.log("Eliminar telefono");
  }

  onTelefonos(){
    console.log("Telefonos");
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.idEmpleado)
  }

}
