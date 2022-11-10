export interface Genericas {
}

export interface PersonalInterface{
    usuario:string,
    pass:string,
    nombre:string,
    apellidos:string,
    provincia:string,
    canton:string,
    distrito:string
}

export interface TelefonoInterface{
    id:string | number,
    telefono:number
}

class Telefono implements TelefonoInterface{
    id!: string | number
    telefono!: number

}