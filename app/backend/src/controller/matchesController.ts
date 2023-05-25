import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class matchesController {
  private _matchService: MatchesService;

  constructor() {
    this._matchService = new MatchesService();
  }

  async getAll(_req: Request, res: Response) {
    const result = await this._matchService.getAll();
    return res.status(200).json(result);
  }
}

export default matchesController;
