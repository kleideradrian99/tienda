import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {

  public url: any;
  public token;
  public orden: any = {};
  public detalles: Array<any> = [];
  public load_data = true;
  public id: any;

  constructor(
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
  }

  ngOnInit(): void {
  }


}
