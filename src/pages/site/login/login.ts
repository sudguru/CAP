import { config } from './../../../app/config.firebase';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { WindowProvider } from '../../../providers/window/window';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  windowRef: any;

  phoneNumber: string;

  verificationCode: string;

  user: any;

  constructor(private win: WindowProvider) { }

  ionViewWillLoad() {
    console.log('load');
    this.windowRef = this.win.windowRef
    firebase.initializeApp(config)
    

  }

  ionViewDidEnter() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }


}