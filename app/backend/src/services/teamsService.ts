import { ITeam } from '../interfaces/ITeams';
import TeamsModel from '../database/models/teams';

class teamsService {
  private _teamModel: typeof TeamsModel;

  constructor() {
    this._teamModel = TeamsModel;
  }

  async getAll(): Promise<ITeam[]> {
    const result = await this._teamModel.findAll();
    return result;
  }
}

export default teamsService;
