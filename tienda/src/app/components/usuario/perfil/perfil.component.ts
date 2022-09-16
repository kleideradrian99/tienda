import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {};
  public id: any;
  public token;

  constructor(
    private _clienteService: ClienteService,
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if (this.id) {
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response => {
          this.cliente = response.data;
        })
    }
  }

  ngOnInit(): void {
  }

  actualizar(actualizarForm: any) {
    if (actualizarForm.valid) {
      this.cliente.password = $('#input_password').val();
      this._clienteService.actuaizar_perfil_cliente_guest(this.id, this.cliente, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#00FF00',
            messageColor: '#000',
            backgroundColor: '#EFEFEF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se Actualizo su perfil correctamente'
          });
        }
      );
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

}
