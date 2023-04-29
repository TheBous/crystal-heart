import { Service } from 'typedi';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import FakeEcg from '../json/fake.json';
import { MeasurementModel } from '@/models/measurement.model';

import { EcgModel } from '@/models/ecg.model';

const rrPeaksIndexes = [
  111, 234, 356, 480, 602, 726, 855, 987, 1117, 1246, 1378, 1508, 1637, 1768, 1897, 2022, 2148, 2272, 2399, 2527, 2656, 2785, 2911, 3038, 3167, 3295,
  3422, 3551, 3683, 3811, 3939, 4069, 4199, 4327, 4454, 4579, 4705, 4832, 4962, 5090, 5220, 5351, 5482, 5613, 5742, 5872, 6000, 6123, 6249, 6497,
  6622, 6745, 6867, 6989, 7116, 7245, 7374, 7503, 7633, 7762, 7890, 8019, 8146, 8273, 8402, 8533, 8665, 8796, 8924, 9051, 9178, 9302, 9425, 9547,
  9670, 9796, 9925, 10055, 10183, 10310, 10438, 10563, 10689, 10817, 10945, 11070, 11195, 11320, 11447, 11574, 11699, 11826, 11948, 12070, 12191,
  12309, 12426, 12542, 12652, 12763, 12874, 12987, 13103, 13223, 13341, 13458, 13574, 13688, 13796, 13906, 14016, 14130, 14240, 14350, 14458, 14565,
  14672, 14777, 14880, 14988, 15100, 15207, 15314, 15427, 15546, 15663, 15780, 15896, 16012, 16124, 16232, 16345, 16459, 16573, 16685, 16794, 16904,
  17018, 17132, 17250, 17370, 17489, 17613, 17734, 17852, 17968, 18083, 18198, 18313, 18429, 18543, 18656, 18768, 18878, 18987, 19095, 19206, 19320,
  19436, 19551, 19669, 19788, 19905, 20023, 20139, 20255, 20373, 20491, 20610, 20728, 20847, 20967, 21086, 21207, 21327, 21450, 21571, 21689, 21806,
  21924, 22042, 22160, 22278, 22395, 22510, 22625, 22741, 22856, 22972, 23090, 23209, 23330, 23453, 23577, 23698, 23819, 23941, 24064, 24184, 24303,
  24422, 24539, 24655, 24769, 24885, 24998, 25111, 25226, 25340, 25456, 25574, 25691, 25808, 25924, 26040, 26156, 26270, 26384, 26498, 26613, 26727,
  26841, 26953, 27069, 27184, 27301, 27418, 27535, 27653, 27771, 27889, 28009, 28125, 28241, 28355, 28467, 28578, 28687, 28795, 28903, 29013, 29124,
  29236, 29350, 29463, 29579, 29696, 29814, 29936, 30058, 30179, 30303, 30427, 30549, 30671, 30790, 30907, 31024, 31139, 31254, 31368, 31483, 31598,
  31712, 31827, 31944, 32064, 32184, 32303, 32420, 32538, 32656, 32773, 32891, 33009, 33129, 33250, 33371, 33492, 33614, 33732, 33850, 33968, 34085,
  34200, 34314, 34425, 34535, 34644, 34752, 34859, 34965, 35072, 35179, 35288, 35401, 35514, 35630, 35747, 35864, 35981, 36097, 36212, 36325, 36438,
  36551, 36663, 36777,
];

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
      rrPeaksIndexes.forEach(index => {
        if (!!flattenedEcg[index]) {
          flattenedEcg[index].isRR = true;
        }
      });

      const totalElements = await MeasurementModel.countDocuments(filters);
      return { measurements: flattenedEcg, total: totalElements };
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

      rrPeaksIndexes.forEach(index => (flattenedEcg[index].isRR = true));

      return { ecg: flattenedEcg };
    } catch (e: any) {
      console.warn(e);
      return [];
    }
  }
}
