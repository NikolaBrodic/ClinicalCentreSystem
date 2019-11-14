export class Patient {

    constructor(
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public address: string,
        public city: string,
        public country: string,
        public healthInsuranceID: string,
        public status: PatientStatus
    ) {
    }

}

export enum PatientStatus {
    AWAITING_APPROVAL,
    APPROVED
}
