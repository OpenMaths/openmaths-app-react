export class GoogleUser {
    email:string;
    email_verified:boolean;
    name:string;
    picture:string;
    given_name:string;
    family_name:string;
    locale:string;
    csrf:string;

    constructor(data) {
        this.email = data.email ? data.email : null;
        this.email_verified = data.email_verified && data.email_verified == 'true';
        this.name = data.name ? data.name : null;
        this.picture = data.picture ? data.picture : null;
        this.given_name = data.given_name ? data.given_name : null;
        this.family_name = data.family_name ? data.family_name : null;
        this.locale = data.locale ? data.locale : 'en';
        this.csrf = data.csrf ? data.csrf : null;
    }
}