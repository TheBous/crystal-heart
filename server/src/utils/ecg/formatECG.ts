import { Measurement } from '@/interfaces/measurement.interface';
import { addMilliseconds, parseISO } from 'date-fns';

const formatECG = (fakeECG, frequency) => {
  const date = '2023-05-07T22:41:02';

  const ecgMeasurements = (fakeECG as any).data;
  const formattedECG: Measurement[] = [];
  for (const [i, item] of ecgMeasurements.entries()) {
    for (const [j, sample] of item.ecg.Samples.entries()) {
      let timestamp: Date | null = null;
      if (i === 0 && j === 0) timestamp = parseISO(date);
      else timestamp = addMilliseconds(new Date(formattedECG?.[formattedECG?.length - 1]?.timestamp), 1000 / frequency);
      formattedECG.push({
        value: sample,
        timestamp: timestamp as any,
      });
    }
  }

  return formattedECG;
};

export default formatECG;
