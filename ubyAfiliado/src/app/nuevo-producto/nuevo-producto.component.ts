import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductoFotos } from '../interfaces/producto';
import { ProductosFotosService, ProductosService } from '../services/productos.service';
import { NgxImageCompressService, UploadResponse} from 'ngx-image-compress'

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
  base64:string="";
  loading:boolean=false;

  constructor(private imageCompress:NgxImageCompressService, private service:ProductosService, private fotosService:ProductosFotosService,private rou:ActivatedRoute) { 
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
  uploadAndResize() {
    this.productoFoto.producto = this.objeto.nombre
    return this.imageCompress.uploadFile().then(({image, orientation}: UploadResponse) => {
        this.imageCompress.compressFile(image, orientation, 50, 50).then((result: string) => {
          this.productoFoto.fotoData = result;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      });
        this.imageCompress.compressFile(image, orientation, 50, 50, 200, 100).then((result: string) => {
            this.productoFoto.thumbnails = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        });
    });
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
    this.service.onEliminar(this.objeto.nombre)
  }

  onFotos(){
    this.onGuardar(false)
    this.editMode = true
    console.log(this.objeto.nombre)
    this.fotosService.get(this.objeto.nombre).subscribe({
      next: (data) =>{
        console.log(data)
        this.listaFotos = data
      }
    })
  }

  onAddFoto(){
    this.productoFoto.producto = this.objeto.nombre
    console.log(this.productoFoto)
    this.loading = true
    this.fotosService.add(this.productoFoto).subscribe({
      next: (data) =>{
        this.fotosService.avisoSuccess("Añadido", "")
        this.loading = false
        window.location.reload()
      }, error: (err) =>{
        this.fotosService.avisoError(err.error)
        this.loading = false
      }
    })

  }
  onDeleteFoto(foto:ProductoFotos){

  }

  

}
