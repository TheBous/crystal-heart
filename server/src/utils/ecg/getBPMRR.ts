import { Measurement } from '@/interfaces/measurement.interface';
import { differenceInMilliseconds } from 'date-fns';

const getBPMRR = (ecgMeasurements: Measurement[] = []) => {
  let lastRRPeakTimestamp = null;
  // default normal bpm
  let lowestBpmValue = { value: 60, timestamp: null };
  // default normal rr interval
  let highestRRInterval = { value: 800, timestamp: null };
  const rrIntervalsBPM = ecgMeasurements.reduce(
    (acc, ecgMeasurement) => {
      const { timestamp, isRR } = ecgMeasurement;
      if (!lastRRPeakTimestamp && isRR) lastRRPeakTimestamp = timestamp;
      else {
        if (isRR) {
          const rrInterval = differenceInMilliseconds(new Date(timestamp), lastRRPeakTimestamp);
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

  return { ...rrIntervalsBPM, lowestBpmValue, highestRRInterval };
};

export default getBPMRR;
