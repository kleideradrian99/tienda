import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto: any = {};
  public load_btn = false;

  constructor(
    private _guestService: GuestService,
  ) { }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.load_btn = true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response => {
          iziToast.show({
            title: 'Info:',
            titleColor: '#00FF00',
            messageColor: '#000',
            backgroundColor: '#efefef',
            class: 'text-success',
            position: 'topRight',
            message: 'Se envió Correctamente el mensaje'
          });
          this.contacto = {};
          this.load_btn = false;
        }
      );
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
