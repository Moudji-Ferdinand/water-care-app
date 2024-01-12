import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireDatabase} from '@angular/fire/compat/database';

import {SpectroData} from '../model/spectro-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) { }

  // Add a sample data
  addSpectroData(spectroData: any) {
      spectroData.id = this.afs.createId();
      return this.afs.collection('/SpectroData').add(spectroData);
  }
  getAllSpectroData() {
    return this.afs.collection('/SpectroData').snapshotChanges();
  }
  getLiveUpdates() {
    return this.db.object('/SpectroData_A01').valueChanges();
  }
  setTestStatus(status) {
    const testRef = this.db.object('/Test');
    // set() for destructive updates
    return  testRef.set({ testStatus: status, testStatus1: 'start'});
  }
}
