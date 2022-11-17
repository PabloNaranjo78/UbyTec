import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Comercio,AdminComercio} from '../interfaces/comercio'
import { Telefono, TelefonoInterface } from '../interfaces/genericas';
import { ComerciosAdminService } from '../services/comercios.service';
import { DireccionesService, TelefonosService } from '../services/telefonos.service';


@Component({
  selector: 'app-nuevo-afiliado-admin',
  templateUrl: './nuevo-afiliado-admin.component.html',
  styleUrls: ['./nuevo-afiliado-admin.component.css']
})
export class NuevoAfiliadoAdminComponent implements OnInit {



  objeto:AdminComercio = new AdminComercio();

  editMode:boolean = true;
  listaTelefonos:Telefono[]=[]
  telefonoNuevo:Telefono = new Telefono();
  idComercio:number=0;

  provincias:string[] = [];
  cantones:string[] = [];
  distritos:string[] = [];

  constructor(private service:ComerciosAdminService, private telefonosService:TelefonosService, private direccionesService:DireccionesService, private route:Router, private rou:ActivatedRoute) {
    this.telefonosService.url = "AdminComerTelefonos";
    this.telefonosService.nombre = "Telefono de Administrador";
    this.telefonosService.homePage = "actualizar/administrador/" + this.rou.snapshot.params['id'];
    this.idComercio = this.rou.snapshot.params['id']
    this.service.id = this.rou.snapshot.params['id']
    this.objeto.idComercio = this.rou.snapshot.params['id']
    this.service.get(this.rou.snapshot.params['id']).subscribe({
      /*Mensaje emergente de exito*/
      next: (data) => {
        if (data[0]== undefined){
          this.getProvincia();
          this.editMode = false
        } else {
          this.objeto = data[0]
          this.getProvincia();
          this.getCanton();
          this.getDistrito();
        }
      },
      /*Mensaje emergente de error*/
      error: (err) =>{
        this.service.avisoError(err.error)}
    });
    console.log(this.objeto)
  }

  ngOnInit(): void {

  }

  onGuardar(recargar?:boolean){
    console.log(this.objeto)
    if (this.editMode){
      this.service.onActualizar(this.objeto,this.objeto.nombre,recargar)
    } else {
      this.service.onNuevo(this.objeto,this.objeto.nombre, recargar)
    }
  }
  onCancelar(){
    this.service.onCancelar()
  }

  onEliminar(){
    this.service.onEliminar(this.objeto.idAdmin)
  }


  onTelefonos(){
    if (!this.editMode){
      this.onGuardar(false)
      this.editMode = true
    }
    this.telefonosService.get(this.objeto.idAdmin).subscribe({
      /*Mensaje emergente de exito*/
      next: (data) => {
        this.listaTelefonos = data;
      },
      /*Mensaje emergente de error*/
      error: (err) =>{
        this.service.avisoError(err.error)}
    })
  }

  onAddTelefono(){
    this.telefonoNuevo.id = this.objeto.idAdmin
    this.telefonosService.onNuevo(this.telefonoNuevo,this.telefonoNuevo.telefono)
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
