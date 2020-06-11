import { ChallengeController, ChallengeService } from './';
import { ChallengeSchema, MatchSchema } from './db';
import { PlayersModule } from 'src/players';
import { CategoriesModule } from 'src/categories';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Challenge', schema: ChallengeSchema},
      {name: 'Match', schema: MatchSchema}]),
    PlayersModule,
    CategoriesModule],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
