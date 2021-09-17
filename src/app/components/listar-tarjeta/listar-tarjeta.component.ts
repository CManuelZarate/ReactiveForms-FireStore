import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listTarjetas: TarjetaCredito[]=[];

  constructor(private _tarjetaService: TarjetaService,
             private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();//cuando se inicialize el comp se hace uso del metodo
  }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe( doc => {
      this.listTarjetas = [];
      //console.log(doc);
      //recorremos el doc
      doc.forEach( (element : any) => {
        this.listTarjetas.push({
          id:element.payload.doc.id,//insertamos el id
          ...element.payload.doc.data() //insertamos una copia del obj
        });
        /* 
        console.log(element.payload.doc.id);//obtengo el id
        console.log(element.payload.doc.data());
 */        
      } );
      console.log(this.listTarjetas);
      
    });
  }

  eliminarTarjeta(id:any){
    this._tarjetaService.eliminarTarjeta(id).then(() => {
        this.toastr.error('tarjeta eliminada con exito','Registro Eliminado');
    }, error => {
      this.toastr.error('Oops .. . erro','Eroor');
      console.log(error);
      
    } )
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }

}
