import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public load_data = true;
  public cupones: Array<any> = [];
  public filtro = '';
  public token;

  //PAGINACION
  public page = 1;
  public pageSize = 5;

  constructor(
    private _cuponService: CuponService
  ) {

    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response => {
        this.cupones = response.data;

        this.load_data = false;
      }
    )
  }

  filtrar() {
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response => {
        this.cupones = response.data;

        this.load_data = false;
      }, error => {
        console.log(error)
      }
    )
  }

  eliminar(id: any) {
    this._cuponService.eliminar_cupon_admin(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Success',
          titleColor: '#FF2D00',
          messageColor: '#000',
          backgroundColor: '#FFB2A2',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Elimino Correctamente el Cupon'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        //Cargar Listado
        this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
          response => {
            this.cupones = response.data;

            this.load_data = false;
          }
        )


      }, error => {
        console.log(error)
      }
    )
  }
}
