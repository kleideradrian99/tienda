import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token;
  public id: any;
  public user: any | undefined;
  public user_lc: any | undefined;
  public config_global: any = {};
  public carrito_arr: Array<any> = [];
  public url: any;
  public subtotal = 0;

  // Modal Carrito
  public op_cart = false;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
  ) {
    // Inicializar URL
    this.url = global.url;
    //Categorias
    this._clienteService.obtener_config_public().subscribe(
      response => {
        this.config_global = response.data;
      },
      error => {
        console.log(error);
      }
    )

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if (this.token) {
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        res => {
          this.user = res.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));

          if (localStorage.getItem('user_data')) {
            this.user_lc = JSON.parse(localStorage.getItem('user_data') || '{}');

            // Obtener Data del carrito
            this._clienteService.obtener_carrito_cliente(this.user_lc._id, this.token).subscribe(
              response => {
                this.carrito_arr = response.data;
                this.calcular_carrito();
              }
            );
          } else {
            this.user_lc = undefined;
          }
        }, error => {
          console.log(error);
          this.user = undefined;
        });
    }
  }

  ngOnInit(): void {
  }

  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

  op_modalCart() {
    if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
    } else {
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

  calcular_carrito(){
    this.carrito_arr.forEach(element =>{
this.subtotal = this.subtotal + parseInt(element.producto.precio);
    });
  }
}
