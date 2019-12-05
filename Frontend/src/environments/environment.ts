// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  itemsPerPage: 5,
  baseUrl: 'http://localhost:8080',
  examinationType: '/api/examination-type',
  doctor: '/api/doctor',
  user: '/api/auth',
  clinicalCentreAdmin: '/api/clinical-centre-admin',
  patient: '/api/patient',
  room: '/api/room',
  clinic: '/api/clinic',
  clinicAdmin: '/api/clinic-administrator',
  nurse: '/api/nurse',
  examination: '/api/examination',
  timeOffDoctor: '/api/time-off-doctor',
  timeOffNurse: '/api/time-off-nurse',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
