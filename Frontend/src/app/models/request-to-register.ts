export class RequestToRegister {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;

    constructor(firstName: string, lastName: string, email: string, status: string, id?: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.status = status;
        this.id = id;
    }
}