export class User {
    email: string;
    oldPassword: string;
    newPassword: string;

    constructor(email: string, oldPassword: string, newPassword: string) {
        this.email = email;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}