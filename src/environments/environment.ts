// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase : {
    apiKey: 'AIzaSyBUSryGkjCPHI8A1otICDDxfkhwqRe-hj4',
    authDomain: 'mdb2-db.firebaseapp.com',
    projectId: 'mdb2-db',
    storageBucket: 'mdb2-db.appspot.com',
    messagingSenderId: '213362634661',
    appId: '1:213362634661:web:5ab3e7d0dd2b877facc24c',
    measurementId: 'G-S013SSNRMX',
    databaseURL: 'https://mdb2-db-default-rtdb.europe-west1.firebasedatabase.app'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
