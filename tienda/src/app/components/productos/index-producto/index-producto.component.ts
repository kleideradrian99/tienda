import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global'

declare var noUiSlider: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  // LLamar Las Categorias
  public config_global: any = {};
  public filter_categoria = '';
  public productos: Array<any> = [];
  public filter_producto = '';
  public load_data = true;
  public url;
  public filter_cat_productos = 'todos';

  constructor(
    private _clienteService: ClienteService,
  ) {
    this.url = global.url;

    this._clienteService.obtener_config_public().subscribe(
      response => {
        this.config_global = response.data;
      }
    );

    //Mostrar los productos
    this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;
        this.load_data = false;
      });
  }

  ngOnInit(): void {
    var slider: any = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: [0, 1000],
      connect: true,
      range: {
        'min': 0,
        'max': 1000
      },
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 5,
      }
    })

    slider.noUiSlider.on('update', function (values: any) {
      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size', '11px');
  }


  buscar_categoria() {
    if (this.filter_categoria) {
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_global.categorias = this.config_global.categorias.filter(
        function (item: any) {
          return search.test(item.titulo);
        }
      );
    } else {
      this._clienteService.obtener_config_public().subscribe(
        response => {
          this.config_global = response.data;
        }
      )
    }
  }

  buscar_producto() {
    this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;
        this.load_data = false;
      });
  }

  buscar_precio() {
    this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;
        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());

        this.productos = this.productos.filter(
          function (item: any) {
            return item.precio >= min && item.precio <= max;
          }
        );
      });
  }

  buscar_por_categoria() {
    if (this.filter_cat_productos == 'todos') {
      this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
        response => {
          this.productos = response.data;
          this.load_data = false;
        });
    } else {
      this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
        response => {
          this.productos = response.data;
          this.productos = this.productos.filter(item => item.categoria == this.filter_cat_productos);
        });
      
    }
  }
}
