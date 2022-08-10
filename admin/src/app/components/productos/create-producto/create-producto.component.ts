import { Component, OnInit } from '@angular/core';
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

  public producto: any = [];
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;


  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      console.log(this.producto);
      console.log(this.file);

      this._productoService.registro_producto_admin(this.token, this.producto, this.file).subscribe(
        response => {
          console.log(response);
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
        message: 'Los datos del formulario no son validos'
      });
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
