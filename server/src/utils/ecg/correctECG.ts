const correctECG = (ecgMeasurements: any[], type: 'bpm' | 'rr') => {
  return ecgMeasurements.map(measurement => {
    const { value } = measurement;
    if (type === 'bpm') {
      if (value > 120) return { ...measurement, value: 60 };
      return measurement;
    }
    if ((type = 'rr')) {
      if (value < 500) return { ...measurement, value: 1000 };
      return measurement;
    }
    return measurement;
  });
};

export default correctECG;
