import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token;
  public productos: Array<any> = [];
  public url;
  public load_btn = false;

  //PAGINACION
  public page = 1;
  public pageSize = 10;

  constructor(
    private _productoService: ProductoService,
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
      response => {
        console.log(response);
        this.productos = response.data;
        this.load_data = false;
      }, error => {
        console.log(error);
      }
    )
  }

  filtrar() {
    if (this.filtro) {
      this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
        response => {
          console.log(response);
          this.productos = response.data;
          this.load_data = false;
        }, error => {
          console.log(error);
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debes ingresar el nombre del producto'
      });
    }
  }

  resetear() {
    this.filtro = '';
    this.init_data();
  }

  eliminar(id: any) {
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Success',
          titleColor: '#141514',
          messageColor: '#000',
          backgroundColor: '#B2FFB8',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Elimino Correctamente el cliente'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
        this.load_btn = false;
      }, error => {

        iziToast.show({
          title: 'Success',
          titleColor: '#FF2D00',
          messageColor: '#000',
          backgroundColor: '#FFB2A2',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        console.log(error);
        this.load_btn = false;
      }
    )
  }

}
