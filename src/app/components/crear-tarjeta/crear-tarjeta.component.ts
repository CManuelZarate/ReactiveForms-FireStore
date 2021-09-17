import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  titulo:string= 'agregar tarjeta';
  id:string|undefined;

  constructor(private fb: FormBuilder,
              private _tarjetaService: TarjetaService,
              private toastr: ToastrService) {
    this.form =this.fb.group({
      titular: [ '', Validators.required ],  //podemos poner + validadciones caracter min max,sicr asyn
      numeroTarjeta: [ '', [Validators.required, Validators.minLength(16), Validators.maxLength(16)] ],
      fechaExpiracion: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(5)] ],
      cvv: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(3)] ],
    })
   }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      console.log(data);
      this.id=data.id;//seteamos loq este llegando como parametro con el id
      this.titulo='editar tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,
      })
    })
  }

  guardarTarjeta(){

    if(this.id === undefined){
      //creamos nueva tarjeta
      this.agregarTarjeta();
    }else{
      //editamos tarjeta
      this.editarTarjeta(this.id);
    }
    
  }

  editarTarjeta(id:string){
    const TARJETA: any = {//despuesvemos 
      titular : this.form.value.titular,
      numeroTarjeta : this.form.value.numeroTarjeta,
      fechaExpiracion : this.form.value.fechaExpiracion,
      cvv : this.form.value.cvv,
      fechaActualizacion : new Date(),
    };
    this.loading=true;
    this._tarjetaService.editarTarjeta(id, TARJETA).then( () =>{
      this.loading = false;
      this.titulo= 'agregar Tarjeta';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('la tarjeta fue actualziada', 'Registro Actualizado');
    }, error =>{
      console.log(error);
      
    })
  }
  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular : this.form.value.titular,
      numeroTarjeta : this.form.value.numeroTarjeta,
      fechaExpiracion : this.form.value.fechaExpiracion,
      cvv : this.form.value.cvv,
      fechaCreacion : new Date(),
      fechaActualizacion : new Date(),
    };

    this.loading = true; 
    console.log(TARJETA);
    this._tarjetaService.guardarTarjeta(TARJETA).then( () => {
      this.loading = false;
      console.log("tarjeta registrada");
      this.toastr.success('La tarjeta se registro con exito', 'Tarjeta registrada');
      this.form.reset();//limpia doc
      
    }, error => {
      this.loading = false;
      this.toastr.error('Opps.. Ocurrio un error', 'Error');
      console.log(error);})
  }

}
