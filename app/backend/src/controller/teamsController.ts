import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class teamsController {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  async getAll(_req: Request, res: Response) {
    const result = await this._teamService.getAll();
    return res.status(200).json(result);
  }
}

export default teamsController;
