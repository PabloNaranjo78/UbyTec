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
          if (data[0]==undefined){
            idComercio: this.objeto.idComercio;
            idAdmin: 0;
            correo:"";
            usuario: "";
            pass: "";
            nombre: "";
            apellidos: "";
            provincia: "";
            canton: "";
            distrito: ""
          } else {
            this.adminComercio = data[0];
          }
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
      this.objeto.solicitud = "aceptada"
      this.service.onActualizar(this.objeto,this.objeto.nombre)
    } else {
      
      this.adminComercio.idComercio = this.objeto.idComercio
      console.log(this.adminComercio)
      this.service.add(this.objeto).subscribe({
        next: (data) => {
          this.adminService.add(this.adminComercio).subscribe({
            /*Mensaje emergente de exito*/
            next: (data) => {
              this.adminService.avisoSuccess("añadido", this.adminComercio.nombre);
              this.route.navigate([this.service.getHomePage()])
            },
              /*Mensaje emergente de error*/
            error: (err) =>{
              this.adminService.avisoError(err.error)
              }
          })
        }, 
        error: (err) => {
          this.service.avisoError(err.error)
        }
      })
      
    }
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.objeto.solicitud = "rechazada"
    this.service.onActualizar(this.objeto,this.objeto.nombre)
    const input = document.getElementById('message') as HTMLInputElement | null;
    if (input != null) {
      console.log(
        {id: this.objeto.idComercio,
        message: input.value}
        );
    }

  }
}
