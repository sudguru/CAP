export interface IUser {
    uid: string;
    displayName: string;
    email: string
    emailVerified: boolean;
    photoURL: string,
    providerId: string,
    phoneNumber: string,
    userType: string,
    error: string,

}

export class iUser implements IUser {
    constructor(
        public uid: string, 
        public displayName: string,
        public email: string,
        public emailVerified: boolean,
        public photoURL: string,
        public providerId: string,
        public phoneNumber: string,
        public userType: string,
        public error: string
    ) {}
}

/*
*   phoneNumber = userNumber
*   user8083 = User
*   admin5438 = Admin
*   1357924680 = Merchant
*/