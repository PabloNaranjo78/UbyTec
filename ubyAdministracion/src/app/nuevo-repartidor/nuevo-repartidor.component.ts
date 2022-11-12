import { Component, OnInit } from '@angular/core';
import {Empleado} from '../interfaces/empleado';
import {Repartidor} from '../interfaces/repartidor';

@Component({
  selector: 'app-nuevo-repartidor',
  templateUrl: './nuevo-repartidor.component.html',
  styleUrls: ['./nuevo-repartidor.component.css']
})
export class NuevoRepartidorComponent implements OnInit {

  repartidor: Repartidor = new Repartidor();
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


  onCancelar(){
    console.log("Cancelar");
  }

  onEliminar(){
    console.log("Eliminar");
  }

}
