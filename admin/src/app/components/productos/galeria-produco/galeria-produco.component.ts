import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-galeria-produco',
  templateUrl: './galeria-produco.component.html',
  styleUrls: ['./galeria-produco.component.css']
})
export class GaleriaProducoComponent implements OnInit {

  public producto: any = {};
  public id: any;
  public token;
  public file: File | undefined;
  public load_btn = false;
  public load_btn_eliminar = false;
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
        this.init_data();
      }
    );
  }

  init_data() {
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
    );
  }
  ngOnInit(): void {
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
      $('#input-img').val('');

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
    // $('#input-img').val('');
    // this.imgSelect = 'assets/img/01.jpg';
    //   this.file = undefined;
    // }
  }

  subir_imagen() {
    if (this.file != undefined) {
      let data = {
        imagen: this.file,
        _id: uuidv4()
      };
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.token, data, this.id).subscribe(response => {
        this.init_data();
        $('#input-img').val('');
      })
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe seleccionar una imagen para subir'
      });
    }
  }

  eliminar(id: any) {
    this.load_btn_eliminar = true;
    this._productoService.eliminar_imagen_galeria_admin(this.id, this.token, { _id: id }).subscribe(
      response => {
        iziToast.show({
          title: 'Success',
          titleColor: '#141514',
          messageColor: '#000',
          backgroundColor: '#B2FFB8',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Elimino Correctamente la imagen'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
        this.load_btn_eliminar = false;
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
        this.load_btn_eliminar = false;
      }
    )
  }

}
