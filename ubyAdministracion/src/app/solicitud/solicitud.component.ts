import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminComercio, AdminComercioInterface, Comercio } from '../interfaces/comercio';
import { Telefono } from '../interfaces/genericas';
import { ComerciosAdminService, ComerciosService } from '../services/comercios.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  objeto:Comercio = new Comercio();
  editMode:boolean = true;
  listaTelefonos:Telefono[]=[]
  telefonoNuevo:Telefono = new Telefono();
  adminComercio:AdminComercio = new AdminComercio(); 

  constructor(private service:ComerciosService, private adminService: ComerciosAdminService,private route:Router, private rou:ActivatedRoute) { 
  }

  ngOnInit(): void {
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false;
    } else {
      this.adminService.get(this.rou.snapshot.params['id']).subscribe({
        /*Mensaje emergente de exito*/
        next: (data) => {
          console.log(data)
          this.adminComercio = data[0];
        },
        /*Mensaje emergente de error*/
        error: (err) =>{
          this.adminService.avisoError(err.error)}
      });
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
      this.objeto.solicitud = false
      this.service.onActualizar(this.objeto,this.objeto.nombre)
    } else {
      this.service.onNuevo(this.objeto,this.objeto.nombre)
      this.adminService.onNuevo(this.adminComercio,this.adminComercio.nombre)
    }
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    
  }
}
