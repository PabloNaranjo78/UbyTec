import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductoFotos } from '../interfaces/producto';
import { ProductosFotosService, ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  objeto:Producto = new Producto()
  editMode:boolean = true;
  listaFotos:ProductoFotos[] = []
  productoFoto:ProductoFotos = new ProductoFotos()
  public archivos: any = []
  base64:string="";
  loading:boolean=false;

  constructor(private sanitazer:DomSanitizer, private service:ProductosService, private fotosService:ProductosFotosService,private rou:ActivatedRoute) { 
    this.objeto.idComercio = this.rou.snapshot.params['id']
    this.service.id = this.rou.snapshot.params['id']
    this.fotosService.id = this.rou.snapshot.params['id']
    if (this.rou.snapshot.params['producto']== undefined){
      this.editMode = false
      this.fotosService.url = this.rou.snapshot.params['id'] + "/nuevo/productos"
    } else {
      this.fotosService.url = this.rou.snapshot.params['id'] + "/actualizar/productos/"+this.rou.snapshot.params['producto']
      this.service.get(this.rou.snapshot.params['producto']).subscribe({
        next: (data) => {
          this.objeto = data[0]
        }
      })
    }
  }

  ngOnInit(): void {
  }

  capturarImagenes(event:any): any{
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.productoFoto.foto = imagen.base
      this.productoFoto.producto = this.objeto.nombre
      //this.listaFotos.push(this.productoFoto)
    })
  }

  extraerBase64 = async($event:any) => new Promise((resolve) =>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitazer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();

      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return true
    } catch (e){
      return null;
    }
  })

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
    this.service.onEliminar(this.objeto.nombre)
  }

  onFotos(){
    this.onGuardar(false)
    this.editMode = true
  }

  onAddFoto(){
    this.productoFoto.producto = this.objeto.nombre
    console.log(this.productoFoto)
    this.loading = true
    this.fotosService.add(this.productoFoto).subscribe({
      next: (data) =>{
        this.fotosService.avisoSuccess("Añadido", "")
        this.loading = false
      }, error: (err) =>{
        this.fotosService.avisoError(err.error)
        this.loading = false
      }
    })

  }
  onDeleteFoto(foto:ProductoFotos){

  }

  

}
