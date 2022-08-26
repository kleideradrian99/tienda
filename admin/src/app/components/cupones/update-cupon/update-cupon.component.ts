import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  };
  public load_btn = false;
  public load_data = true;
  public token;
  public id: any;

  constructor(
    private _cuponService: CuponService,
    private _Router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        this._cuponService.obtener_cupon_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.cupon = undefined;
              this.load_data = false;
            } else {
              this.cupon = response.data;
              this.load_data = false;
            }
          }, error => {
            console.log(error)
          }
        )

      })
  }

  actualizar(actualizarForm: any) {

    if (actualizarForm.valid) {
      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#141514',
            messageColor: '#000',
            backgroundColor: '#B2FFB8',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el cupon'
          });
          this.load_btn = false;
          this._Router.navigate(['/panel/cupones']);
        }, error => {
          console.log(error)
          this.load_btn = false;
        }
      )
      this.load_btn = false;
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
    this.load_btn = false;
  }
}

