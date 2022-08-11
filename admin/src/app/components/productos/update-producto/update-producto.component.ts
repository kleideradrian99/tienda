import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {};
  public imgSelect: any | ArrayBuffer = '';
  public load_btn = false;
  public id: any;
  public token;
  public url;
  public file: File | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;
              this.imgSelect = this.url + 'obtener_portada/' + this.producto.portada;
            }
          }, error => {
            console.log(error);
          }
        )
      }
    )
  }

  actualizar(actualizarForm: any) {
    if (actualizarForm.valid) {
      //Data
      var data: any = {};
      if (this.file != undefined) {
        data.portada = this.file;
      }
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      
      this.load_btn = true;

      this._productoService.actualizar_producto_admin(this.token, data, this.id).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#141514',
            messageColor: '#000',
            backgroundColor: '#B2FFB8',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro Correctamente el nuevo producto'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        }, error => {
          console.log(error);
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
        message: 'Los datos del formulario no son validos'
      });
      this.load_btn = false;
    }
  }


  fileChangeImage(event: any): void {
    var file;
    //Validar si tenemos imagen
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una Imagen'
      });
    }

    // if (file?.size < 4000000) {
    if (file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/gif' || file?.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(file);

      //Poner el nombre de la imagen
      $('#input-portada').text(file.name);

      this.file = file;

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'El formato del archivo debe ser de una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    // } else {
    //   iziToast.show({
    //     title: 'ERROR',
    //     titleColor: '#FF0000',
    //     messageColor: '#000',
    //     class: 'text-danger',
    //     position: 'topRight',
    //     message: 'La imagen no puede superar los 4mg'
    //   });
    // $('#input-portada').text('Seleccionar imagen');
    // this.imgSelect = 'assets/img/01.jpg';
    //   this.file = undefined;
    // }
  }
}
