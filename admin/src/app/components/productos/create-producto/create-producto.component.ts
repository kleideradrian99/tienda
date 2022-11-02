import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {
    categoria: ''
  };
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;
  public load_btn = false;

  // LLamar Las Categorias
  public config_global: any = {};


  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
    this._adminService.obtener_config_public().subscribe(
      response => {
        this.config_global = response.data;
        console.log(this.config_global);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.file == undefined) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          messageColor: '#000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe subir una imagen de portada'
        });
      } else {
        // console.log(this.producto);
        // console.log(this.file);
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.token, this.producto, this.file).subscribe(
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
            this._router.navigate(['/panel/productos']);
            this.load_btn = false;

          }, error => {
            console.log(error);
            this.load_btn = false;
          }
        )
      }

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
      this.load_btn = true;
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
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
