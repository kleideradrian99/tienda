import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public token;

  public direccion: any = {
    pais: '',
    region: '',
    provincia: '',
    distrito: '',
    principal: false,
  };

  public regiones: Array<any> = [];
  public provincias: Array<any> = [];
  public distritos: Array<any> = [];

  public regiones_arr: Array<any> = [];
  public provincias_arr: Array<any> = [];
  public distritos_arr: Array<any> = [];

  constructor(
    private _guestService: GuestService,
    private _clienteService: ClienteService,
  ) {
    this.token = localStorage.getItem('token');

    this._guestService.get_Regiones().subscribe(
      response => {
        this.regiones_arr = response;
      }
    );
    this._guestService.get_Provincias().subscribe(
      response => {
        this.provincias_arr = response;
      }
    );
    this._guestService.get_Distritos().subscribe(
      response => {
        this.distritos_arr = response;
      }
    );
  }

  ngOnInit(): void {
  }

  select_pais() {
    if (this.direccion.pais == 'Perú') {
      $('#sl-region').prop('disabled', false);
      // Obtener regiones
      this._guestService.get_Regiones().subscribe(
        response => {
          response.forEach((element: any) => {
            this.regiones.push({
              id: element.id,
              name: element.name,
            });
          });
          // console.log(this.regiones);
        }
      );
    } else {
      $('#sl-region').prop('disabled', true);
      $('#sl-provincia').prop('disabled', true);
      this.regiones = [];
      this.provincias = [];

      this.direccion.region = '';
      this.direccion.provincia = '';
    }
  }

  select_region() {
    this.provincias = [];
    $('#sl-provincia').prop('disabled', false);
    $('#sl-distrito').prop('disabled', true);
    this.direccion.provincia = '';
    this.direccion.distrito = '';
    this._guestService.get_Provincias().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.department_id == this.direccion.region) {
            this.provincias.push(
              element
            );
          }
        });
        // console.log(this.provincias);
      }
    );
  }

  select_provincias() {
    this.distritos = [];
    $('#sl-distrito').prop('disabled', false);
    this.direccion.distrito = '';
    this._guestService.get_Distritos().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.province_id == this.direccion.provincia) {
            this.distritos.push(
              element
            );
          }
        });
      }
    );
  }

  registrar(registroForm: any) {
    if (registroForm.valid) {

      this.regiones_arr.forEach(element => {
        if (element.id == parseInt(this.direccion.region)) {
          this.direccion.region = element.name;
        }
      });

      this.provincias_arr.forEach(element => {
        if (element.id == parseInt(this.direccion.provincia)) {
          this.direccion.provincia = element.name;
        }
      });

      this.distritos_arr.forEach(element => {
        if (element.id == parseInt(this.direccion.distrito)) {
          this.direccion.distrito = element.name;
        }
      });

      let data = {
        destinatario: this.direccion.destinatario,
        dni: this.direccion.dni,
        zip: this.direccion.zip,
        direccion: this.direccion.direccion,
        telefono: this.direccion.telefono,
        pais: this.direccion.pais,
        region: this.direccion.region,
        provincia: this.direccion.provincia,
        distrito: this.direccion.distrito,
        principal: this.direccion.principal,
        cliente: localStorage.getItem('_id'),
      };

      this._clienteService.registro_direccion_cliente(data, this.token).subscribe(
        response => {
          this.direccion = {
            pais: '',
            region: '',
            provincia: '',
            distrito: '',
            principal: false,
          };
          $('#sl-region').prop('disabled', true);
          $('#sl-provincia').prop('disabled', true);
          $('#sl-distrito').prop('disabled', true);
          iziToast.show({
            title: 'Success',
            titleColor: '#00FF00',
            messageColor: '#000',
            backgroundColor: '#EFEFEF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se agrego la nueva direccion correctamente'
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
