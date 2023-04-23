import { Ecg } from './ecg.interface';

export interface Measurement {
  _id?: string;
  ecg: Ecg[];
}
