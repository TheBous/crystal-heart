import { Service } from 'typedi';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
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

  public async getRR(id: string): Promise<any> {
    try {
      const filters = { ecg: id };
      const ecgs = await MeasurementModel.find(filters).sort({
        timestamp: 'asc',
      });

      const frequency = 125;
      const measuresInASecond = 1 / frequency;
      const msMeasuresInASecond = measuresInASecond * 1000;

      const formattedEcg = ecgs.map(measurement => {
        return (measurement as any).samples.map((sample, index) => {
          let timestamp = (measurement as any).timestamp;
          if (index !== 0) {
            const time = index * msMeasuresInASecond;
            timestamp = addMilliseconds(new Date((measurement as any).timestamp), time);
          }

          const printedTimestamp = differenceInMilliseconds(new Date(timestamp), new Date((ecgs[0] as any).timestamp));
          return {
            sample,
            timestamp: printedTimestamp,
          };
        });
      });

      const flattenedEcg = formattedEcg.flat();
      console.warn(flattenedEcg);
      return { ecg: flattenedEcg };
    } catch (e: any) {
      console.warn(e);
      return [];
    }
  }
}
