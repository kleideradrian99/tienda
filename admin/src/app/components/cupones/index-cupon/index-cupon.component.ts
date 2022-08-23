import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

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
      }, error => {
        console.log(error)
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


}
