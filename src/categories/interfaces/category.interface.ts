import { Event } from "./category.event"
import { Player } from "src/players/interfaces/"
import { Document } from "mongoose"

export interface Category extends Document {
  readonly category: string
  description: string
  events: Array<Event>
  players: Array<Player>
}