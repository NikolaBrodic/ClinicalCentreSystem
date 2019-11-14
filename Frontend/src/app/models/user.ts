export class User {
    oldPassword: String;
    newPassword: String;

    constructor(oldPassword: String, newPassword: String) {
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}