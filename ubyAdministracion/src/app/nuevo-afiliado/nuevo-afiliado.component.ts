import { Component, OnInit } from '@angular/core';
import {Comercio} from '../interfaces/comercio'

@Component({
  selector: 'app-nuevo-afiliado',
  templateUrl: './nuevo-afiliado.component.html',
  styleUrls: ['./nuevo-afiliado.component.css']
})
export class NuevoAfiliadoComponent implements OnInit {

  comercio:Comercio = new Comercio();
  editMode:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onGuardar(){
    console.log("Guardar");
    this.comercio.solicitud = true;
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
