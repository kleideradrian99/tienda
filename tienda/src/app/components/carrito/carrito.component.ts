import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';
import { Router } from '@angular/router';

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

  public btn_load = false;
  public carrito_load = true;
  public error_cupon = '';
  public descuento = 0;

  // Socket
  public socket = io('http://localhost:4201');

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService,
    private _router: Router
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
            description: 'Pago MB Latina',
            amount: {
              currency_code: 'USD',
              value: this.subtotal
            },
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        // console.log(order);
        this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;
        // Mandamos los productos al backend
        this.venta.detalles = this.dventa;
        this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(
          response => {
            this._clienteService.enviar_correo_envio_compra(response.venta, this.token).subscribe(
              reponse => {
                this._router.navigate(['/']);
              }
            );
          }
        );
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
        this.carrito_load = false;
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

    // console.log(this.venta)
  }

  get_pago_tarjet_credito() {

  }

  validar_cupon() {
    if (this.venta.cupon) {
      if (this.venta.cupon.toString().length <= 20) {
        this._clienteService.validar_cupon_cliente(this.venta.cupon, this.token).subscribe(
          response => {
            if (response.data != undefined) {
              this.error_cupon = '';

              // Validar el tipo de descuento
              if (response.data.tipo == 'Valor Fijo') {
                this.descuento = response.data.valor;
                this.total_pagar = this.total_pagar - this.descuento;
              } else if (response.data.tipo == 'Porcentaje') {
                this.descuento = (this.total_pagar * response.data.valor) / 100;
                this.total_pagar = this.total_pagar - this.descuento;
              }

            } else {
              this.error_cupon = "El cupon no se pudo canjear"
            }
          }
        );
      } else {
        this.error_cupon = "El cupon debe ser menor de 20 caracteres"
      }
    } else {
      this.error_cupon = "El cupon no es valido"
    }

  }
}
