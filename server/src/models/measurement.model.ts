import { model, Schema, Document } from 'mongoose';
import { Measurement } from '@interfaces/measurement.interface';

const MeasurementSchema: Schema = new Schema({
  ecg: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Ecg',
  },
  timestamp: {
    type: Date,
  },
  samples: {
    type: Array,
    of: Number,
    default: [],
  },
});

export const MeasurementModel = model<Measurement & Document>('Measurement', MeasurementSchema);
