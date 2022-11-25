import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-detalle-ordene',
  templateUrl: './detalle-ordene.component.html',
  styleUrls: ['./detalle-ordene.component.css']
})
export class DetalleOrdeneComponent implements OnInit {

  public url: any;
  public token;
  public orden: any = {};
  public detalles: Array<any> = [];
  public load_data = true;
  public id: any;


  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
    this.token = localStorage.getItem('token');
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._clienteService.obtener_detalles_ordenes_cliente(this.id, this.token).subscribe(
          response => {
            if (response.data != undefined) {
              this.orden = response.data;
              this.detalles = response.detalles;
              this.load_data = false;
            } else {
              this.orden = undefined;
            }
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
