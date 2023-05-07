import { model, Schema, Document } from 'mongoose';
import { Ecg } from '@interfaces/ecg.interface';

const EcgSchema: Schema = new Schema({
  date: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  frequency: {
    type: Number,
  },
});

export const EcgModel = model<Ecg & Document>('Ecg', EcgSchema);
