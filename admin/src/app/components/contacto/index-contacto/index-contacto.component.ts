import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  public load_data = true;
  public mensajes: Array<any> = [];
  public filtro = '';
  public token;
  public load_btn = false;

  //PAGINACION
  public page = 1;
  public pageSize = 5;

  constructor(
    private _adminService: AdminService,

  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.init_data();
  }


  init_data() {
    this._adminService.obtener_mensajes_admin(this.token).subscribe(
      response => {
        this.mensajes = response.data;
        this.load_data = false;
      }
    );
  }

  cerrar(id: any) {
    this.load_btn = true;
    this._adminService.cambiar_estado_mensaje(id, { data: undefined }, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Success',
          titleColor: '#141514',
          messageColor: '#000',
          backgroundColor: '#EFEFEF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Cerro Correctamente el Mensaje'
        });

        $('#estadoModal-' + id).modal('hide');
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
