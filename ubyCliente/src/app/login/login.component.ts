import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Cliente, ClienteInterface} from '../interfaces/cliente';
import { ClientesService } from '../services/clientes.service';
import { DireccionesService } from '../services/telefonos.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  editMode:boolean = false;
  idCliente!:number
  pass!:string
  
  provincias:string[] = [];
  cantones:string[] = [];
  distritos:string[] = [];


  objeto:Cliente = new Cliente();

  constructor(private route:Router, private aoth:UserService, private cookie: CookieService, private router: Router, private httpClient:HttpClient, private ClientesService:ClientesService, private direccionesService:DireccionesService) {
    if (cookie.get("tokenCliente")!=""){
      this.route.navigate([cookie.get("tokenCliente") + "/mi-perfil"])
    }
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.aoth.get(this.idCliente,this.pass).subscribe({
      next:(data) => {
        if(data){
          this.cookie.set("tokenCliente", this.idCliente.toString());
          window.location.reload()
        }
      },
      error:(err) => {
        this.aoth.avisoError("Credenciales inválidas")
      }
      })
  }

  onEliminar(){
    console.log("Eliminar")

  }

  onCancelar(){
    console.log("Cancelar")
  }

  onGuardar(){
    console.log(this.objeto)
    this.ClientesService.onNuevo(this.objeto, this.objeto.nombre)
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
    this.getCanton()
  }
  
  selectedcant(){
    this.getDistrito();
  }

}
