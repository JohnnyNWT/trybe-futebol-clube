import { IMatches } from '../interfaces/IMatches';
import MatchesModel from '../database/models/matches';
import teams from '../database/models/teams';
import formatMatches from '../utils/formatMatches';

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
    return matches.map(formatMatches);
  }

  async getInProgressMatches(): Promise<IMatches[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: true },
      include: [
        { model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches.map(formatMatches);
  }

  async getFinishedMatches(): Promise<IMatches[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches.map(formatMatches);
  }

  async finishMatch(id: number) {
    const match = await this._matchModel.findByPk(id);

    if (!match) {
      return { message: 'Match not found' };
    }

    if (!match.dataValues.inProgress) {
      return { message: 'This game is over' };
    }

    match.inProgress = false;
    await match.save();
    return { message: 'Finished' };
  }

  async updateMatchProgress(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this._matchModel.findByPk(id);

    if (!match) {
      return { message: 'Match not found' };
    }

    if (!match.dataValues.inProgress) {
      return { message: 'This game is over' };
    }

    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;

    await match.save();

    return match;
  }
}

export default matchesService;
