import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getMatches.bind(matchesController));
matchesRouter.patch(
  '/:id/finish',
  validateToken.verifyToken,
  matchesController.finishMatch.bind(matchesController),
);
matchesRouter.patch(
  '/:id',
  validateToken.verifyToken,
  matchesController.updateMatchProgress.bind(matchesController),
);
matchesRouter.post(
  '/',
  validateToken.verifyToken,
  matchesController.createMatch.bind(matchesController),
);

export default matchesRouter;
