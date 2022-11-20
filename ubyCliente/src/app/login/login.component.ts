import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Cliente, ClienteInterface} from '../interfaces/cliente';
import { ClientesService } from '../services/clientes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
CrearCuenta() {
throw new Error('Method not implemented.');
}

  editMode:boolean = false;
  idCliente!:number
  fechaNac!:string
  usuario!:string
  pass!:string
  nombre!:string
  apellidos!:string
  provincia!:string
  canton!:string
  distrito!:string


  objeto:Cliente = new Cliente();

  constructor(private route:Router, private aoth:UserService, private cookie: CookieService, private router: Router, private httpClient:HttpClient, private ClientesService:ClientesService) {
    if (cookie.get("tokenCliente")!=""){
      this.route.navigate([cookie.get("tokenCliente") + "/gestion/cliente"])
    }
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.aoth.get(this.idCliente,this.pass).subscribe({
      next:(data) => {
        if(data){
          this.cookie.set("tokenCliente", this.idCliente.toString(), 4, "/");
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
    this.objeto.idCliente = this.idCliente;
    this.objeto.fechaNac= this.nombre;
    this.objeto.usuario= this.usuario;
    this.objeto.pass = this.pass;
    this.objeto.nombre = this.nombre;
    this.objeto.apellidos = this.apellidos;
    this.objeto.provincia = this.provincia;
    this.objeto.canton = this.canton;
    this.objeto.distrito = this.distrito;
    console.log(this.objeto)
    this.ClientesService.onNuevo(this.objeto, this.objeto.nombre)
  }

}
