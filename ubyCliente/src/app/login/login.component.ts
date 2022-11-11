import { Component, OnInit } from '@angular/core';
import {Cliente} from '../interfaces/cliente';

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
  id!:string
  password!:string
  
  cliente:Cliente = new Cliente();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

    console.log(this.cliente)

  }

  prueba(){
    console.log(this.cliente)
  }

  onCancelar(){
    console.log("Cancelar")
  }

  onEliminar(){
    console.log("Eliminar")
  }

  onGuardar(){
    console.log("Guardar")
  }

}
