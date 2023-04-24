import { Service } from 'typedi';
import FakeEcg from '../json/fake.json';
import { MeasurementModel } from '@/models/measurement.model';
import { EcgModel } from '@/models/ecg.model';

type Config = {
  page?: string;
  limit?: string;
};
@Service()
export class EcgService {
  public async saveEcg(): Promise<void> {
    console.warn();
  }

  public async getEcg(id: string, config: Config = {}): Promise<any> {
    try {
      const { page, limit } = config ?? {};
      const _page = parseInt(page);
      const _limit = parseInt(limit);
      const filters = { ecg: id };
      const measurements = await MeasurementModel.find(filters)
        .skip((_page - 1) * _limit)
        .limit(_limit)
        .sort({
          timestamp: 'asc',
        });
      const totalElements = await MeasurementModel.countDocuments(filters);
      return { measurements, total: totalElements };
    } catch (e: any) {
      console.warn(e);
      return [];
    }
  }

  public async uploadEcg(userId: any): Promise<boolean> {
    try {
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
