import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent implements OnInit {

  public descuento: any = {};
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;
  public load_btn = false;

  constructor(
    private _adminService: AdminService,
    private _descuentoService: DescuentoService,
    private _router: Router,
  ) {
    this.token = localStorage.getItem('token');
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
          message: 'Debe subir un banner'
        });
      } else {
        // console.log(this.producto);
        // console.log(this.file);
        if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {
          this.load_btn = true;
          this._descuentoService.registro_descuento_admin(this.token, this.descuento, this.file).subscribe(
            response => {
              iziToast.show({
                title: 'Success',
                titleColor: '#141514',
                messageColor: '#000',
                backgroundColor: '#efefef',
                class: 'text-success',
                position: 'topRight',
                message: 'Se registro Correctamente el nuevo descuento'
              });
              this._router.navigate(['/panel/descuentos']);
              this.load_btn = false;

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
            message: 'El descuento debe estar entre 1% y 100%'
          });
        }
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
