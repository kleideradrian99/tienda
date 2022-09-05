import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-variedad-produco',
  templateUrl: './variedad-produco.component.html',
  styleUrls: ['./variedad-produco.component.css']
})
export class VariedadProducoComponent implements OnInit {

  public producto: any = {};
  public id: any;
  public token;
  public nuevaVariedad = '';
  public load_btn = false;
  public url: any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
    
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;

            }
            console.log(this.producto);
          }, error => {
            console.log(error);
          }
        )
      }
    );
  }

  ngOnInit(): void {
  }

  agregar_variedad() {
    if (this.nuevaVariedad) {
      this.producto.variedades.push({ titulo: this.nuevaVariedad });
      this.nuevaVariedad = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'El campo de la variedad debe ser completado'
      });
    }
  }

  eliminarVariedad(idx: any) {
    this.producto.variedades.splice(idx, 1);
  }


  actualizar() {
    if (this.producto.titulo_variedad) {
      if (this.producto.variedades.length >= 1) {
        //Actulizar Data
        this.load_btn = true;
        this._productoService.actualizar_producto_variedades_admin(this.token, this.id, {
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        }).subscribe(
          res => {
            console.log(res);
            iziToast.show({
              title: 'Success',
              titleColor: '#141514',
              messageColor: '#000',
              backgroundColor: '#B2FFB8',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registro correctamente las variedades'
            });
            this.load_btn = false;
          }
        )
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          messageColor: '#000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se debe agregar al menos una variedad'
        });
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar el titulo de la variedad'
      });
    }
  }

}
