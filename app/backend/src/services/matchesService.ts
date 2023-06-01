import { IMatches } from '../interfaces/IMatches';
import MatchesModel from '../database/models/matches';
import teams from '../database/models/teams';
import formatMatches from '../utils/formatMatches';

class matchesService {
  private _matchModel: typeof MatchesModel;
  private _teamsModel: typeof teams;

  constructor() {
    this._matchModel = MatchesModel;
    this._teamsModel = teams;
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

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const { type, message } = await this.verifyMatches(homeTeamId, awayTeamId);

    if (type.length > 0) {
      return { type, message };
    }

    const createMatch = await this._matchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    return { type: '', message: '', createMatch };
  }

  async verifyMatches(homeTeamId: number, awayTeamId: number) {
    if (homeTeamId === awayTeamId) {
      return {
        type: 'EQUAL_TEAMS',
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const verifyHomeTeam = await this._teamsModel.findByPk(homeTeamId);
    const verifyAwayTeam = await this._teamsModel.findByPk(awayTeamId);

    if (!verifyAwayTeam || !verifyHomeTeam) {
      return { type: 'TIME_NOT_FOUND', message: 'There is no team with such id!' };
    }

    return { type: '', message: '' };
  }
}

export default matchesService;
