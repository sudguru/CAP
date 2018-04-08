import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminIndexPage } from './admin-index';

@NgModule({
  declarations: [
    AdminIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminIndexPage),
  ],
})
export class AdminIndexPageModule {}
