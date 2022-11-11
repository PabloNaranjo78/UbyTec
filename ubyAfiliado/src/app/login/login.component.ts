import { Component, OnInit } from '@angular/core';
import {Comercio} from '../interfaces/comercio';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

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
