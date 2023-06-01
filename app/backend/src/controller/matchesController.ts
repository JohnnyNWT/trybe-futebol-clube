import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class matchesController {
  private _matchService: MatchesService;

  constructor() {
    this._matchService = new MatchesService();
  }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches;

    if (!inProgress) {
      matches = await this._matchService.getAll();
    }
    if (inProgress === 'true') {
      matches = await this._matchService.getInProgressMatches();
    }
    if (inProgress === 'false') {
      matches = await this._matchService.getFinishedMatches();
    }
    return res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this._matchService.finishMatch(Number(id));
    return res.status(200).json(match);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const update = await this._matchService.updateMatchProgress(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    return res.status(200).json({ update });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { type, message, createMatch } = await this._matchService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    if (type === 'EQUAL_TEAMS') {
      return res.status(422).json({ message });
    }

    if (type === 'TIME_NOT_FOUND') {
      return res.status(404).json({ message });
    }

    return res.status(201).json(createMatch);
  }
}

export default matchesController;
