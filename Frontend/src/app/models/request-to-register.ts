export class RequestToRegister {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(firstName: string, lastName: string, email: string, id?: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = id;
    }
}