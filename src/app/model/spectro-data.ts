export interface ISpectroData {
  id: string;
  experimentalSetup: any;
  sampleAttributes: any;
  intensities: number[];
  wavelength: number[];
}

export class SpectroData implements ISpectroData {
  id: string;
  experimentalSetup: any;
  sampleAttributes: any;
  intensities: number[];
  wavelength: number[];

  constructor() {
    // No need to call super() in this case, as SpectroData is not extending another class
    this.id = '';
    this.experimentalSetup = null;
    this.sampleAttributes = null;
    this.intensities = [];
    this.wavelength = [];
  }

  toPlainObject(): ISpectroData {
    return {
      id: this.id,
      experimentalSetup: this.experimentalSetup,
      sampleAttributes: this.sampleAttributes,
      intensities: this.intensities,
      wavelength: this.wavelength,
    };
  }
}

