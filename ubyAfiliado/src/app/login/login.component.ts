import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Comercio} from '../interfaces/comercio';
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

  id!:string
  password!:string
  editMode:boolean = false; 

  comercio:Comercio = new Comercio();

  constructor(private route:Router, private aoth:UserService, private cookie: CookieService, private router: Router, private httpClient:HttpClient) { 
    if (cookie.get("tokenAfiliado")!=""){
      this.route.navigate([cookie.get("tokenAfiliado") + "/gestion-productos"])
    }
  }
  ngOnInit(): void {
  }

  onSubmit(){
    this.aoth.get(this.id,this.password).subscribe({
      next:(data) => {
        if(data){
          this.cookie.set("tokenAfiliado", this.id.toString(), 4, "/");
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

  prueba(){
    console.log(this.comercio)
  }
  onGuardar(){
    console.log("Guardar")
  }

}

