import { Service } from 'typedi';
import FakeEcg from '../json/fake.json';
import { MeasurementModel } from '@/models/measurement.model';
import { EcgModel } from '@/models/ecg.model';

@Service()
export class EcgService {
  public async saveEcg(): Promise<void> {
    console.warn();
  }
  public async saveTestFakeEcg(userId: any): Promise<boolean> {
    try {
      console.warn('Saving fake ECG');
      const formattedEcg = FakeEcg.data.map((item: any) => {
        return {
          timestamp: item.ecg.Timestamp,
          ecg: item.ecg.Samples,
        };
      });
      const ecg = await EcgModel.create({ date: new Date(), user: userId });
      if (ecg) {
        const { _id } = ecg;
        for (const measurement of formattedEcg) {
          await MeasurementModel.create({ ecg: _id, timestamp: measurement.timestamp, samples: measurement.ecg });
        }
      }

      return true;
    } catch (e: any) {
      console.warn(e);
      return false;
    }
  }
}
