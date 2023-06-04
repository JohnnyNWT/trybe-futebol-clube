import { Router } from 'express';
import Leaderboard from '../controller/leaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new Leaderboard();

leaderboardRouter.get(
  '/home',
  leaderboardController.calcTeamStats.bind(leaderboardController),
);

leaderboardRouter.get(
  '/away',
  leaderboardController.calcTeamStats.bind(leaderboardController),
);

leaderboardRouter.get(
  '/',
  leaderboardController.calcTeamStats.bind(leaderboardController),
);

export default leaderboardRouter;
