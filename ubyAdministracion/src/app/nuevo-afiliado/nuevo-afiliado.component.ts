import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Comercio} from '../interfaces/comercio'
import { ComerciosService } from '../services/comercios.service';

@Component({
  selector: 'app-nuevo-afiliado',
  templateUrl: './nuevo-afiliado.component.html',
  styleUrls: ['./nuevo-afiliado.component.css']
})
export class NuevoAfiliadoComponent implements OnInit {

  objeto:Comercio = new Comercio();
  editMode:boolean = true;
  

  constructor(private service:ComerciosService, private route:Router, private rou:ActivatedRoute) { 
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

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.idComercio)
  }

}
