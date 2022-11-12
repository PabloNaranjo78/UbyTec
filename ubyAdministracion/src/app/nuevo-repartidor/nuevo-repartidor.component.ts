import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Empleado} from '../interfaces/empleado';
import { TelefonoInterface } from '../interfaces/genericas';
import {Repartidor} from '../interfaces/repartidor';
import { RepartidoresService } from '../services/repartidores.service';

@Component({
  selector: 'app-nuevo-repartidor',
  templateUrl: './nuevo-repartidor.component.html',
  styleUrls: ['./nuevo-repartidor.component.css']
})
export class NuevoRepartidorComponent implements OnInit {

  objeto: Repartidor = new Repartidor();
  editMode:boolean = true;

  constructor(private service:RepartidoresService, private route:Router, private rou:ActivatedRoute) { 
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
    this.service.onEliminar(this.objeto.usuario)
  }

}

