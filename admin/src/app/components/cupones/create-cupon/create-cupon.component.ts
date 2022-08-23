import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  };
  public load_btn = false;
  public token;

  constructor(
    private _cuponService: CuponService,
    private _Router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    this.load_btn = true;
    if (registroForm.valid) {
      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        Response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#141514',
            messageColor: '#000',
            backgroundColor: '#B2FFB8',
            class: 'text-success',
            position: 'topRight',
            message: 'Se agregro correctamente el nuevo cupon'
          });
          this.load_btn = false;
          this._Router.navigate(['/panel/cupones']);
        }, error => {
          console.log(error)
          this.load_btn = false;
        }
      )
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
  }

}
