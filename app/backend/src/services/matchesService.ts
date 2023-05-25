import { IMatches } from '../interfaces/IMatches';
import MatchesModel from '../database/models/matches';
import teams from '../database/models/teams';

class matchesService {
  private _matchModel: typeof MatchesModel;

  constructor() {
    this._matchModel = MatchesModel;
  }

  async getAll(): Promise<IMatches[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const formattedResult = matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: !!match.inProgress,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    }));

    return formattedResult;
  }
}

export default matchesService;
