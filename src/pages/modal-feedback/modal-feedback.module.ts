import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFeedbackPage } from './modal-feedback';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ModalFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFeedbackPage),
    StarRatingModule,
  ],
})
export class ModalFeedbackPageModule {}
