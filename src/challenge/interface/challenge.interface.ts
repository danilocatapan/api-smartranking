import { Match } from "./"
import { ChallengeStatus } from "../enums/challenge-status.enum"
import { Player } from "src/players/interfaces"
import { Document } from "mongoose"

export interface Challenge extends Document {
  dateHourChallenge: Date
  status: ChallengeStatus 
  dateHoraRequest: Date
  DateHoraResponse: Date
  challenger: Player
  category: string
  players: Player[]
  match: Match
}