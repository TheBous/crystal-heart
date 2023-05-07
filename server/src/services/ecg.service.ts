import { Service } from 'typedi';
import { addMilliseconds, differenceInMilliseconds, parseISO } from 'date-fns';
import axios from 'axios';
import FakeEcg from '../json/20230502T230934.json';
import { MeasurementModel } from '@/models/measurement.model';
import { EcgModel } from '@/models/ecg.model';

type Config = {
  page?: string;
  limit?: string;
};
@Service()
export class EcgService {
  public async saveEcg(userId: string, date: string, frequency = 125): Promise<void> {
    try {
      const ecg = await EcgModel.create({ date: new Date(), user: userId });
      if (!!ecg) {
        const { _id: ecgId } = ecg;
        const formattedECG = [];
        console.time('format');
        for (const [i, item] of (FakeEcg as any).data.entries()) {
          for (const [j, sample] of item.ecg.Samples.entries()) {
            let timestamp = null;
            if (i === 0 && j === 0) timestamp = parseISO(date);
            else timestamp = addMilliseconds(formattedECG?.[formattedECG?.length - 1]?.timestamp ?? 0, 1000 / frequency);
            formattedECG.push({
              ecg: ecgId,
              value: sample,
              timestamp,
            });
          }
        }
        console.timeEnd('format');

        console.time('Python');
        const body = {
          ecg: formattedECG.map(ecgValue => ecgValue.value),
          frequency,
        };

        const { data: { rr: rPeaksIndexes } = {} } = await axios.post(`${process.env.PYTHON_SERVER}/rr`, body);
        console.timeEnd('Python');
        console.time('isRR');
        for (const rPeaksIndex of rPeaksIndexes) {
          if (!!formattedECG[rPeaksIndex]) formattedECG[rPeaksIndex].isRR = true;
        }
        console.timeEnd('isRR');
        console.time('insert');

        const chunks = 100000;

        for (let i = 0; i < formattedECG.length; i += chunks) {
          await MeasurementModel.insertMany(formattedECG.slice(i, i + chunks), { ordered: false });
        }

        console.timeEnd('insert');
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async getUserEcgs(userId: string, config: Config = {}): Promise<any> {
    const { page, limit } = config ?? {};
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const filters = { user: userId };

    const ecgs = await EcgModel.find(filters)
      .skip((_page - 1) * _limit)
      .limit(_limit)
      .sort({
        timestamp: 'asc',
      });

    return { ecgs };
  }

  public async uploadEcg(userId: any): Promise<boolean> {
    try {
      const formattedEcg = (FakeEcg as any).data.map((item: any) => {
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
        frequency,
      };

      const { data: { rr: rrPeaksIndexes, bpm } = {} } = await axios.post(`${process.env.PYTHON_SERVER}/rr`, body);

      rrPeaksIndexes.forEach(index => {
        if (!!flattenedEcg[index]) {
          flattenedEcg[index].isRR = true;
        }
      });

      const rrDistancesMs = rrPeaksIndexes.slice(1).map((index, i) => (index - rrPeaksIndexes[i]) * (1000 / frequency));
      const totalElements = await MeasurementModel.countDocuments(filters);

      return { measurements: flattenedEcg, total: totalElements, rrDistancesMs, bpm, frequency };
    } catch (e: any) {
      console.error(e);
      return [];
    }
  }

  public async getStats(id: string, config: Config = {}): Promise<any> {
    try {
      const filters = { ecg: id };
      const { page, limit } = config ?? {};
      const _page = parseInt(page);
      const _limit = parseInt(limit);
      console.time('query');
      const ecgMeasurements = await MeasurementModel.find(filters)
        .skip((_page - 1) * _limit)
        .limit(_limit)
        .sort({
          timestamp: 'asc',
        });

      console.timeEnd('query');

      const totalElements = await MeasurementModel.countDocuments(filters);

      let lastRRPeakTimestamp = null;
      // default normal bpm
      let lowestBpmValue = { value: 60, timestamp: null };
      // default normal rr interval
      let highestRRInterval = { value: 800, timestamp: null };
      const rrIntervalsBPM = ecgMeasurements.reduce(
        (acc, ecgMeasurement) => {
          const { timestamp, isRR } = ecgMeasurement.toObject();
          if (!lastRRPeakTimestamp && isRR) lastRRPeakTimestamp = timestamp;
          else {
            if (isRR) {
              const rrInterval = differenceInMilliseconds(timestamp, lastRRPeakTimestamp);
              const bpm = (60 * 1000) / rrInterval;
              const cuttedBpm = Math.round(bpm);
              if (bpm < 40) {
                console.warn();
              }
              acc['bpm'].push({ timestamp, value: cuttedBpm });
              if (bpm < lowestBpmValue.value) lowestBpmValue = { value: cuttedBpm, timestamp };
              if (rrInterval > highestRRInterval.value) highestRRInterval = { value: rrInterval, timestamp };
              acc['rrIntervals'].push({ timestamp, value: rrInterval });
              lastRRPeakTimestamp = timestamp;
            }
          }
          return acc;
        },
        { bpm: [], rrIntervals: [] },
      );

      return { bpm: rrIntervalsBPM.bpm, rrIntervals: rrIntervalsBPM.rrIntervals, lowestBpmValue, highestRRInterval, total: totalElements };
    } catch (e) {
      console.error(e);
    }
  }

  public async getInstantStats(config: Config = {}): Promise<any> {
    try {
      const { page, limit } = config ?? {};
      const _page = parseInt(page);
      const _limit = parseInt(limit);

      const frequency = 125;

      const date = '2023-05-02T21:09:34Z';

      const ecgMeasurements = (FakeEcg as any).data;

      const formattedECG = [];
      for (const [i, item] of ecgMeasurements.entries()) {
        for (const [j, sample] of item.ecg.Samples.entries()) {
          let timestamp = null;
          if (i === 0 && j === 0) timestamp = parseISO(date);
          else timestamp = addMilliseconds(formattedECG?.[formattedECG?.length - 1]?.timestamp ?? 0, 1000 / frequency);
          formattedECG.push({
            value: sample,
            timestamp,
          });
        }
      }

      const totalElements = formattedECG.length;
      const slicedElements = formattedECG.slice((_page - 1) * _limit, _page * _limit);

      const body = {
        ecg: slicedElements.map(ecgValue => ecgValue.value),
        frequency,
      };
      const { data: { rr: rPeaksIndexes } = {} } = await axios.post(`${process.env.PYTHON_SERVER}/rr`, body);
      for (const rPeaksIndex of rPeaksIndexes) {
        if (!!slicedElements[rPeaksIndex]) slicedElements[rPeaksIndex].isRR = true;
      }

      let lastRRPeakTimestamp = null;
      // default normal bpm
      let lowestBpmValue = { value: 60, timestamp: null };
      // default normal rr interval
      let highestRRInterval = { value: 800, timestamp: null };
      const rrIntervalsBPM = slicedElements.reduce(
        (acc, ecgMeasurement) => {
          const { timestamp, isRR } = ecgMeasurement;
          if (!lastRRPeakTimestamp && isRR) lastRRPeakTimestamp = timestamp;
          else {
            if (isRR) {
              const rrInterval = differenceInMilliseconds(timestamp, lastRRPeakTimestamp);
              const bpm = (60 * 1000) / rrInterval;
              const cuttedBpm = Math.round(bpm);
              if (bpm < 40) {
                console.warn();
              }
              acc['bpm'].push({ timestamp, value: cuttedBpm });
              if (bpm < lowestBpmValue.value) lowestBpmValue = { value: cuttedBpm, timestamp };
              if (rrInterval > highestRRInterval.value) highestRRInterval = { value: rrInterval, timestamp };
              acc['rrIntervals'].push({ timestamp, value: rrInterval });
              lastRRPeakTimestamp = timestamp;
            }
          }
          return acc;
        },
        { bpm: [], rrIntervals: [] },
      );

      return { bpm: rrIntervalsBPM.bpm, rrIntervals: rrIntervalsBPM.rrIntervals, lowestBpmValue, highestRRInterval, total: totalElements };
    } catch (e) {
      console.error(e);
    }
  }
}
