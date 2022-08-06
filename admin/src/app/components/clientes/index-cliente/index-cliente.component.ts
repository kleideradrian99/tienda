import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_apellidos = '';
  public filtro_email = '';
  public token;

  //PAGINACION
  public page = 1;
  public pageSize = 5;

  constructor(private _clienteService: ClienteService, private _adminService: AdminService) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_data();
  }

  //Cargar data inicial
  init_data() {
    this._clienteService.listar_cliente_filtro_admin(null, null, this.token).subscribe(
      response => {
        this.clientes = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

  filtro(tipo: any) {
    //VALIDAMOS EL TIPO DE DATO
    if (tipo == 'apellidos') {
      //VALIDAR SI EL INPUT ESTA VACIO
      if (this.filtro_apellidos) {
        this._clienteService.listar_cliente_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
          response => {
            this.clientes = response.data;
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.init_data();
      }
    } else if (tipo == 'email') {
      if (this.filtro_email) {
        this._clienteService.listar_cliente_filtro_admin(tipo, this.filtro_email, this.token).subscribe(
          response => {
            this.clientes = response.data;
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.init_data();
      }
    }
  }
}