import { Component, OnInit } from '@angular/core';
import {TelefonoInterface, Telefono} from '../interfaces/genericas';
import {Empleado } from '../interfaces/empleado';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {

  telefonoNuevo:Telefono = new Telefono();
  empleado:Empleado = new Empleado();
  editMode:boolean = false;

  listaTelefonos:Telefono[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  onGuardar(){
    console.log("Guardar");
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
    console.log("Cancelar");
  }

  onEliminar(){
    console.log("Eliminar");
  }

}
