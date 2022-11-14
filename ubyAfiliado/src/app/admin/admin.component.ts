import { Component, OnInit } from '@angular/core';
import { AdminComercio } from '../interfaces/comercio';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  adminComercio:AdminComercio = new AdminComercio();

  editMode:boolean = false;

  onGuardar(){

    console.log("Guardar");
  }

  onAddTelefono(){
    console.log("Agregar telefono");
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
