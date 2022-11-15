import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { global } from 'src/app/services/global';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {

  public descuento: any = {};
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;
  public load_btn = false;
  public id: any;
  public url: any;
  constructor(
    private _adminService: AdminService,
    private _descuentoService: DescuentoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }


  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._descuentoService.obtener_descuento_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.descuento = undefined;
            } else {
              this.descuento = response.data;
              this.imgSelect = this.url + 'obtener_banner_descuento/' + this.descuento.banner;
            }
          }, error => {
            console.log(error);
          }
        )
      }
    );
  }

  actualizar(actualizarForm: any) {
    if (actualizarForm.valid) {
      if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {
        //Data
        var data: any = {};
        if (this.file != undefined) {
          data.banner = this.file;
        }
        data.titulo = this.descuento.titulo;
        data.fecha_inicio = this.descuento.fecha_inicio;
        data.fecha_fin = this.descuento.fecha_fin;
        data.descuento = this.descuento.descuento;

        this.load_btn = true;

        this._descuentoService.actualizar_descuento_admin(this.token, data, this.id).subscribe(
          response => {
            iziToast.show({
              title: 'Success',
              titleColor: '#141514',
              messageColor: '#000',
              backgroundColor: '#EFEFEF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registro Correctamente el descuento.'
            });
            this.load_btn = false;
            this._router.navigate(['/panel/descuentos']);
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
