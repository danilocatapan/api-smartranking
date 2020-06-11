import { Result } from "./";
import { Player } from "src/players/interfaces";

export interface Match extends Document{
  category: string
  players: Player[]
  winner: Player
  result: Result[] 
}