import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
  }

  public calcTeamStats = async (req: Request, res: Response) => {
    const teamStatistics = await this._leaderboardService.generateTeamStats(req.path);
    return res.status(200).json(teamStatistics);
  };
}

export default LeaderboardController;
