import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {SpectroData} from '../model/spectro-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore
  ) { }

  // Add a sample data
  addSpectroData(spectroData: any) {
      spectroData.id = this.afs.createId();
      return this.afs.collection('/SpectroData').add(spectroData);
  }
  getAllSpectroData() {
    return this.afs.collection('/SpectroData').snapshotChanges();
  }
}
