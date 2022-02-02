export class User{
    constructor(
        public type:string,
        public username:string,
        public email:string,
        public password:string,
        public confirmpassword:string,
    ){}
}