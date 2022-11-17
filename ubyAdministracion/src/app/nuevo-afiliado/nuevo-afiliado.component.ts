import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Comercio} from '../interfaces/comercio'
import { Telefono, TelefonoInterface } from '../interfaces/genericas';
import { ComerciosService } from '../services/comercios.service';
import { DireccionesService, TelefonosService } from '../services/telefonos.service';

@Component({
  selector: 'app-nuevo-afiliado',
  templateUrl: './nuevo-afiliado.component.html',
  styleUrls: ['./nuevo-afiliado.component.css']
})
export class NuevoAfiliadoComponent implements OnInit {

  objeto:Comercio = new Comercio();
  editMode:boolean = true;
  listaTelefonos:Telefono[]=[]
  telefonoNuevo:Telefono = new Telefono();

  provincias:string[] = [];
  cantones:string[] = [];
  distritos:string[] = [];


  constructor(private service:ComerciosService, private telefonosService:TelefonosService, private direccionesService:DireccionesService, private route:Router, private rou:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.telefonosService.url = "ComercioTelefonos";
    this.telefonosService.nombre = "Telefono de Comercio";
    if(this.rou.snapshot.params['id']==undefined){
      this.getProvincia();
      this.editMode = false;
      this.telefonosService.homePage = "nuevo/afiliados";
    } else {

      this.telefonosService.homePage = "actualizar/afiliados/"+this.rou.snapshot.params['id'];
      this.service.get(this.rou.snapshot.params['id']).subscribe({
        /*Mensaje emergente de exito*/
        next: (data) => {
          this.objeto = data[0];
          this.getProvincia();
          this.getCanton();
          this.getDistrito();
        },
        /*Mensaje emergente de error*/
        error: (err) =>{
          this.service.avisoError(err.error)}
      });
    }
  }

  onGuardar(recargar?:boolean){
    if (this.editMode){
      this.service.onActualizar(this.objeto,this.objeto.nombre, recargar)
    } else {
      this.service.onNuevo(this.objeto,this.objeto.nombre, recargar)
    }
  }

  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.idComercio)
  }

  onTelefonos(){
    if (!this.editMode){
      this.onGuardar(false)
      this.editMode = true
    }
    this.telefonosService.get(this.objeto.idComercio).subscribe({
      /*Mensaje emergente de exito*/
      next: (data) => {
        this.listaTelefonos = data;
      },
      /*Mensaje emergente de error*/
      error: (err) =>{
        this.service.avisoError(err.error)}
    })
  }
  onAdministrador(){
    this.onGuardar(false)
    this.route.navigate(['actualizar/administrador/' + this.objeto.idComercio])
  }

  onAddTelefono(){
    this.telefonoNuevo.id = this.objeto.idComercio
    this.telefonosService.onNuevo(this.telefonoNuevo,this.telefonoNuevo.telefono)
    this.route.navigate(['actualizar/afiliados/'+this.objeto.idComercio])
  }

  onDeleteTelefono(tel:TelefonoInterface){
    this.telefonosService.onEliminar(tel.id, tel.telefono)
  }

  //Provincias,cantones,distritos
  getProvincia(){
    this.direccionesService.get("Provincia").subscribe({
      next: (data) => {
        this.provincias = data;
      }
    })
  }

  getCanton(){
    this.direccionesService.get(this.objeto.provincia).subscribe({
      next: (data) => {
        this.cantones = data;
      }
  })
}

  getDistrito(){
    this.direccionesService.get(this.objeto.provincia,this.objeto.canton).subscribe({
      next: (data) => {
        this.distritos = data;
      }
  })
}

selected(){
  this.getCanton();
}

selectedcant(){
  this.getDistrito();
}

}
