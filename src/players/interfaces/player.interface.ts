import { Document } from 'mongoose'

export interface Player extends Document {
  name: string
  readonly email: string
  readonly cellphone: string
  ranking: string
  positionRanking: number
  urlPhotoPlayer: string
}