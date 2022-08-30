import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { v4 as uuidv4 } from 'uuid';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config: any = {};
  public titulo_cat = '';
  public icono_cat = '';
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer = '';
  public url: any;


  constructor(
    private _adminService: AdminService,
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
      response => {
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
      }, error => {
        console.log(error)
      }
    );
  }

  ngOnInit(): void {
  }

  agregarCat() {
    if (this.icono_cat && this.titulo_cat) {
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });
      this.icono_cat = '';
      this.titulo_cat = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe Ingresar un titulo e Icono para la categoria'
      });
    }
  }

  actualizar(configForm: any) {
    if (configForm.valid) {
      let data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      };

      console.log(data)
      this._adminService.actualizar_config_admin('6308f0f03f3dba885123aca9', data, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#269202',
            messageColor: '#000',
            backgroundColor: '#EFF0EF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se Actualizo correctamente la configuracion'
          });
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe completar el formulario'
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
      // Arrastra la Imagen
      // $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
      // $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
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

  // Arrastra la Ima
  // ngDoCheck(): void {
  //   $('.cs-file-drop-preview').html("<img src=" + this.imgSelect + ">");
  // }
}
