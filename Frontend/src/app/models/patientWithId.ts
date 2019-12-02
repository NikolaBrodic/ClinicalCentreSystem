export class PatientWithId {
    constructor(
        public id: number,
        public email: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public address: string,
        public city: string,
        public country: string,
        public healthInsuranceID: string
    ) {
    }

}