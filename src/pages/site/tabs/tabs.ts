import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  tab1Root = "IndexPage";
  tab2Root = "NotificationsPage";
  tab3Root = "CalendarPage";
  tab4Root = "ArticlesPage";
  tab5Root = "LoginPage";

}
