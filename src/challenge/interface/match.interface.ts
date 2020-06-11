import { Player } from "src/players/interfaces";
import { Result } from "./result.interface";

export interface Match extends Document{
  category: string
  players: Player[]
  winner: Player
  result: Result[] 
}