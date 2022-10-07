import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public idCliente: any;
  public token;

  public carrito_arr: Array<any> = [];
  public url: any;
  public subtotal = 0;
  public total_pagar = 0;

  constructor(
    private _clienteService: ClienteService,
  ) {
    this.idCliente = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.url = global.url;
    // Obtener Data del carrito
    this._clienteService.obtener_carrito_cliente(this.idCliente, this.token).subscribe(
      response => {
        this.carrito_arr = response.data;
        this.calcular_carrito();
      }
    );
  }

  ngOnInit(): void {
  }

  calcular_carrito() {
    this.carrito_arr.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    });

    this.total_pagar = this.subtotal;
  }

}
