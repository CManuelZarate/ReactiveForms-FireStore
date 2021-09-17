export class TarjetaCredito{
    id?:string;// firestore el id string opcional xq  al crear una tarj ese id se va autogenerar pero para editar si lo vamos a necesitar
    titular:string;
    numeroTarjeta:string;
    fechaExpiracion:string;
    cvv: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    constructor (titular: string, numeroTarjeta: string, fechaExpiracion: string, cvv:number){
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();

    }
}