import { Component, OnInit } from '@angular/core';
import {Comercio,AdminComercio} from '../interfaces/comercio'


@Component({
  selector: 'app-nuevo-afiliado-admin',
  templateUrl: './nuevo-afiliado-admin.component.html',
  styleUrls: ['./nuevo-afiliado-admin.component.css']
})
export class NuevoAfiliadoAdminComponent implements OnInit {


  
  adminComercio:AdminComercio = new AdminComercio(); 

  editMode:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

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
