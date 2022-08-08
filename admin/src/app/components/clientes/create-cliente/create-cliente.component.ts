import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;


@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    genero: ''
  };

  public token;
  public load_btn = false;

  constructor(private _clienteService: ClienteService, private _adminService: AdminService, private _Router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }


  registro(registroForm: { valid: any; }) {
    if (registroForm.valid) {
      // console.log(this.cliente);
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.token, this.cliente).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#141514',
            messageColor: '#000',
            backgroundColor: '#B2FFB8',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro Correctamente el nuevo cliente'
          });
          //Dejar From en blanco
          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            f_nacimiento: '',
            dni: '',
            telefono: '',
            email: ''
          }
          this.load_btn = false;
          this._Router.navigate(['/panel/clientes']);
        }, error => {
          console.log(error);
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
