"use strict";
var GoogleUser = (function () {
    function GoogleUser(data) {
        this.email = data.email ? data.email : null;
        this.email_verified = data.email_verified && data.email_verified == 'true';
        this.name = data.name ? data.name : null;
        this.picture = data.picture ? data.picture : null;
        this.given_name = data.given_name ? data.given_name : null;
        this.family_name = data.family_name ? data.family_name : null;
        this.locale = data.locale ? data.locale : 'en';
        this.csrf = data.csrf ? data.csrf : null;
    }
    return GoogleUser;
}());
exports.GoogleUser = GoogleUser;
//# sourceMappingURL=GoogleApi.js.map