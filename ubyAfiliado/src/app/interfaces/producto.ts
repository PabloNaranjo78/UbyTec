export interface ProductoInterface {
    nombre:string,
    precio:number,
    categoria:string,
    idComercio:number
}

export interface ProductoFotosInterface {
    producto:string,
    foto:string,
    fotoData:string,
    thumbnails:string
}

export class Producto implements ProductoInterface{
    nombre!: string;
    precio!: number;
    categoria!: string;
    idComercio!: number;
}

export class ProductoFotos implements ProductoFotosInterface{
    producto!: string;
    foto!: string;
    fotoData!:string;
    thumbnails!:string;
}