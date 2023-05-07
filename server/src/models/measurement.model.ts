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
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  isRR: {
    type: Boolean,
  },
});

export const MeasurementModel = model<Measurement & Document>('Measurement', MeasurementSchema);
