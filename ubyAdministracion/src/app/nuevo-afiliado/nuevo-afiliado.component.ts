import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Comercio} from '../interfaces/comercio'
import { Telefono, TelefonoInterface } from '../interfaces/genericas';
import { ComerciosService } from '../services/comercios.service';
import { TelefonosService } from '../services/telefonos.service';

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
  

  constructor(private service:ComerciosService, private telefonosService:TelefonosService, private route:Router, private rou:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.telefonosService.url = "ComercioTelefonos";
    this.telefonosService.nombre = "Telefono de Comercio";
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false;
      this.telefonosService.homePage = "nuevo/afiliados";
    } else {

      this.telefonosService.homePage = "actualizar/afiliados/"+this.rou.snapshot.params['id'];
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

  onTelefonos(){
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
      this.route.navigate(['actualizar/administrador/' + this.rou.snapshot.params['id']])
  }

  onAddTelefono(){
    this.telefonoNuevo.id = this.objeto.idComercio
    this.telefonosService.onNuevo(this.telefonoNuevo,this.telefonoNuevo.telefono)
    // kcnsjcf
  }

  onDeleteTelefono(tel:TelefonoInterface){
    this.telefonosService.onEliminar(tel.id, tel.telefono)
    //mcsjhfnjednf
  }
}
