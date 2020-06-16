import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    cellphone: String,
    ranking: String,
    positionRanking: Number,
    urlPhotoPlayer: String,
  },
  { timestamps: true, collection: 'players' },
);
