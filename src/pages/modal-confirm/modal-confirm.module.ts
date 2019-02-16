import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalConfirmPage } from './modal-confirm';

@NgModule({
  declarations: [
    ModalConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalConfirmPage),
  ],
})
export class ModalConfirmPageModule {}
