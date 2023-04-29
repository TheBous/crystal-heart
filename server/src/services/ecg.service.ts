import { Service } from 'typedi';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import axios from 'axios';
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

      const frequency = 125;
      const measuresInASecond = 1 / frequency;
      const msMeasuresInASecond = measuresInASecond * 1000;

      const formattedEcg = measurements.map(measurement => {
        return (measurement as any).samples.map((sample, index) => {
          let timestamp = (measurement as any).timestamp;
          if (index !== 0) {
            const time = index * msMeasuresInASecond;
            timestamp = addMilliseconds(new Date((measurement as any).timestamp), time);
          }

          const printedTimestamp = differenceInMilliseconds(new Date(timestamp), new Date((measurements[0] as any).timestamp));
          return {
            sample,
            timestamp: printedTimestamp,
          };
        });
      });

      const flattenedEcg = formattedEcg.flat();

      // call python service to retrieve rr peaks
      const body = {
        ecg: flattenedEcg.map(item => item.sample),
      };

      const { data: { rr: rrPeaksIndexes, bpm } = {} } = await axios.post(`${process.env.PYTHON_SERVER}/rr`, body);

      rrPeaksIndexes.forEach(index => {
        if (!!flattenedEcg[index]) {
          flattenedEcg[index].isRR = true;
        }
      });

      const rrDistancesMs = rrPeaksIndexes.slice(1).map((index, i) => (index - rrPeaksIndexes[i]) * (1000 / frequency));
      const totalElements = await MeasurementModel.countDocuments(filters);

      return { measurements: flattenedEcg, total: totalElements, rrDistancesMs, bpm };
    } catch (e: any) {
      console.error(e);
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

  public async getStats(id: string): Promise<any> {
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

      // call python service to retrieve rr peaks
      const body = {
        ecg: flattenedEcg.map(item => item.sample),
      };

      const { data: { rr: rrPeaksIndexes, bpm } = {} } = await axios.post(`${process.env.PYTHON_SERVER}/rr`, body);

      const rrDistancesMs = rrPeaksIndexes.slice(1).map((index, i) => (index - rrPeaksIndexes[i]) * (1000 / frequency));

      const lowestBpmValues = [...bpm].sort((a, b) => a - b).slice(0, 5);
      const highestRRValues = [...rrDistancesMs].sort((a, b) => b - a).slice(0, 5);

      return { rr: rrDistancesMs, bpm, lowestBpmValues, highestRRValues };
    } catch (e: any) {
      console.warn(e);
      return [];
    }
  }
}
