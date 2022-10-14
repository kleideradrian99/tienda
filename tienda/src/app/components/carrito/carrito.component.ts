import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast: any;
declare var Cleave: any;
declare var StickySidebar: any;
declare var paypal: any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  // paypal
  @ViewChild('paypalButton', { static: true }) paypalElement: ElementRef | any;

  public idCliente: any;
  public token;

  public carrito_arr: Array<any> = [];
  public url: any;
  public subtotal = 0;
  public total_pagar: any = 0;

  public envios: Array<any> = [];
  public precio_envio = "0";

  public direccion_principal: any = {};

  // Pagos y Detalles de pagos
  public venta: any = {};
  public dventa: Array<any> = [];

  // Socket
  public socket = io('http://localhost:4201');

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService
  ) {
    this.idCliente = localStorage.getItem('_id');
    this.venta.cliente = this.idCliente;
    this.token = localStorage.getItem('token');
    this.url = global.url;

    this.init_data();

    this._guestService.get_Envios().subscribe(
      response => {
        this.envios = response;
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type: any) {
          // update UI ...
        }
      });

      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y']
      });

      var sidebar = new StickySidebar('.sidebar-sticky', { topSpacing: 20 });
    });

    this.get_direccion_principal();

    // PAYPAL
    paypal.Buttons({
      style: {
        layout: 'horizontal'
      },
      createOrder: (data: any, actions: any) => {

        return actions.order.create({
          purchase_units: [{
            description: 'Nombre del pago',
            amount: {
              currency_code: 'USD',
              value: 999
            },
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log(order);
        this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;
        console.log(this.dventa);
      },
      onError: function (err: any) {
      },
      onCancel: function (data: any, actions: any) {
      }
    }).render(this.paypalElement.nativeElement);
  }

  init_data() {
    // Obtener Data del carrito
    this._clienteService.obtener_carrito_cliente(this.idCliente, this.token).subscribe(
      response => {
        this.carrito_arr = response.data;

        this.carrito_arr.forEach(element => {
          this.dventa.push({
            producto: element.producto._id,
            subtotal: element.producto.precio,
            variedad: element.variedad,
            cantidad: element.cantidad,
            cliente: localStorage.getItem('_id'),
          });
        });

        this.calcular_carrito();
        this.calcular_total('Envio Gratis');
      }
    );
  }

  get_direccion_principal() {
    this._clienteService.obtener_direccion_principal(localStorage.getItem('_id'), this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.direccion_principal = undefined;
        } else {
          this.direccion_principal = response.data;
          this.venta.direccion = this.direccion_principal._id;
        }
      }
    );
  }

  calcular_carrito() {
    this.subtotal = 0;
    this.carrito_arr.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    });

    this.total_pagar = this.subtotal;
  }

  eliminar_item(id: any) {
    this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Info:',
          titleColor: '#00FF00',
          messageColor: '#000',
          backgroundColor: '#efefef',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino el producto correctamente'
        });
        // Realtime
        this.socket.emit('delete-carrito', { data: response.data });
        // Obtener Data del carrito
        this.init_data();
      }
    );
  }

  calcular_total(titulo_envio: any) {
    this.total_pagar = parseInt(this.subtotal.toString()) + parseInt(this.precio_envio);
    this.venta.subtotal = this.total_pagar;
    this.venta.envio_precio = parseInt(this.precio_envio);
    this.venta.envio_titulo = titulo_envio;

    console.log(this.venta)
  }
}
