import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from './../../models/auth/account.interface';
import { Profile } from '../../models/auth/profile.interface';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase';
import { User } from 'firebase/app';
import { iUser } from '../../models/auth/user.interface';
import { Store } from '@ngrx/store';
import * as userActions from '../../store/user.actions';
import { AppState } from '../../models/auth/appstate.interface'


@Injectable()
export class AuthProvider {
  profile: Profile;
  emailVerifiedURL: string = 'http://localhost:8100';
  profileDoc: AngularFirestoreDocument<Profile>;



  constructor(
    public http: HttpClient,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  validateAddress(email:string)
  {
    var promise = new Promise((resolve, reject) => {
      this.http.get(`https://apilayer.net/api/check?access_key=7601bd76c44ff5973dc583f76c9de231&email=${email}`)
      .subscribe(data => {
        if(data['smtp_check'])
        {
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      });
    });
    return promise;
  }

async login(account: Account) {

      await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password).then( (user:User) => {
        this.setUserToStore(user);
        return true;
      }).catch( e => {
        this.resetUserToStore(e.message)
        return false;
      })


}

register(account: Account) {

    this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password).then( (user:User) => {
      this.setUserToStore(user);
    }).then(() => {
      this.createProfile();
    }).then( () => {
      this.sendVerificationEmail()
    })
    .catch( e => {
      this.resetUserToStore(e.message)
    })
}


  async createProfile() {
    const user: User = this.afAuth.auth.currentUser;
      const profile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        companyname: "",
        address: "",
        street: "",
        mobile: "",
        city: "",
        country: "",
        workinghours: "",
        usertype: "user",
        facebook: "",
        twitter: "",
        linkedin: "",
        googleplus: "",
        youtube: "",
        instagram: ""
      }
      await this.afs.doc<Profile>(`profiles/${user.uid}`).set(profile);
  }


  async updateProfile(profile: Profile) {
      await this.afs.doc<Profile>(`profiles/${profile.uid}`).set(profile);
  }

  async updateProfilePic(profile: Profile) {
    await this.afs.doc<Profile>(`profiles/${profile.uid}`).update({
      photoURL: profile.photoURL
    });
  }

  logout() {
    this.store.dispatch(new userActions.ResetUser(''))
    this.afAuth.auth.signOut();
  }

  getAutheticatedUser() {
    return  this.afAuth.authState;
  }


  getAutheticatedUserProfile() {
    return this.afAuth.authState
    .switchMap( user => {
      if(user) {
        return this.afs.doc<Profile>(`profiles/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    })
  }

  async changePassword(password: string)
  {
      const user: User = this.afAuth.auth.currentUser;
      await user.updatePassword(password);

  }

  async sendVerificationEmail() {
    var actionCodeSettings = {
      url: this.emailVerifiedURL
    };
    const user = this.afAuth.auth.currentUser;
    if(user){
      console.log(user);
      await user.sendEmailVerification(actionCodeSettings)
    }
  }

  async forgotPassword(email: string) {

    var actionCodeSettings = {
      url: this.emailVerifiedURL
    };
    await this.afAuth.auth.sendPasswordResetEmail(email, actionCodeSettings);
  }

  async loginWithGoogle(){
    const that = this;
    await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(result) {
      //var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
      that.setUserToStore(user);
    })
    .catch( e => {
      that.resetUserToStore(e.message)
    })
    
  }


  setUserToStore(user: User) {
    console.log(user);
    const authenticatedUser: iUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      error: null,
      userType: user.email === "sudeepgurung.sg@gmail.com" ? "admin" : "user"
    }
    
    console.log(authenticatedUser);
    this.store.dispatch(new userActions.SetUser(authenticatedUser));
  }

  resetUserToStore(err: string) {
    this.store.dispatch(new userActions.ResetUser(err));
  }

}
