import { Result } from "./";
import { Player } from "src/players/interfaces";
import { Document } from "mongoose"

export interface Match extends Document{
  category: string
  players: Player[]
  winner: Player
  result: Result[] 
}