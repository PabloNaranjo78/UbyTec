import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TelefonoInterface } from '../interfaces/genericas';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})

export class TelefonosService extends ConexionService<TelefonoInterface> {

  url:string = ""
  homePage:string  = ""
  nombre:string  = ""

  setNombre(nombre:string){
    this.nombre = nombre
  }

  setUrl(url:string){
    this.url = url
  }

  setHomePage(homePage:string)  {
    this.homePage = homePage
  }

  getResourceURL(): string {
    return "/"+this.url
  }

  getHomePage(): string {
    return '/'+this.homePage
  }

  getNombre(): string {
    return this.nombre
  }
  
  constructor(protected override httpClient: HttpClient, protected override route:Router) {
    super(httpClient, route);
  }
}