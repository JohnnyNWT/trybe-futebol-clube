import { Router } from 'express';
import MatchesController from '../controller/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getMatches.bind(matchesController));

export default matchesRouter;
