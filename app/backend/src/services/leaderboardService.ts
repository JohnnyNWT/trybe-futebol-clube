/* eslint-disable max-lines-per-function */
import TeamService from './teamsService';
import MatchesService from './matchesService';

class LeaderboardService {
  private matchesService: MatchesService;
  private teamsService: TeamService;

  constructor() {
    this.matchesService = new MatchesService();
    this.teamsService = new TeamService();
  }

  public generateTeamStats = async (path: string): Promise<any[]> => {
    const finishedMatches = await this.matchesService.getFinishedMatches();
    const teams = await this.teamsService.getAll();

    if (path === '/home') {
      const teamStatistics = teams.map((team) =>
        this.generateHomeTeamMatchesStats(team, finishedMatches));
      return this.sortTeamStats(teamStatistics);
    }

    if (path === '/away') {
      const teamStatistics = teams.map((team) =>
        this.generateAwayTeamMatchesStats(team, finishedMatches));
      return this.sortTeamStats(teamStatistics);
    }

    const teamStatistics = teams.map((team) =>
      this.generateAllTeamMachesStats(team, finishedMatches));
    return this.sortTeamStats(teamStatistics);
  };

  private generateAllTeamMachesStats(team: any, finishedMatches: any[]) {
    const teamMatches = this.getTeamMatches(finishedMatches, team.id);
    const totalGames = teamMatches.length;
    const totalVictories = this.calculateTotalVictories(teamMatches, team.id);
    const totalDraws = this.calculateTotalDraws(teamMatches);
    const goalsFavor = this.calculateGoalsFavor(teamMatches, team.id);
    const goalsOwn = this.calculateGoalsOwn(teamMatches, team.id);
    const goalsBalance = goalsFavor - goalsOwn;

    return {
      name: team.teamName,
      totalPoints: this.calculateTotalPoints(teamMatches, team.id),
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: this.calculateEfficiency(
        this.calculateTotalPoints(teamMatches, team.id),
        totalGames,
      ),
    };
  }

  private generateHomeTeamMatchesStats(team: any, finishedMatches: any[]) {
    const teamMatches = this.homeMatches(finishedMatches, team.id);
    const totalGames = teamMatches.length;
    const totalVictories = this.calculateTotalVictories(teamMatches, team.id);
    const totalDraws = this.calculateTotalDraws(teamMatches);
    const goalsFavor = this.calculateGoalsFavor(teamMatches, team.id);
    const goalsOwn = this.calculateGoalsOwn(teamMatches, team.id);
    const goalsBalance = goalsFavor - goalsOwn;

    return {
      name: team.teamName,
      totalPoints: this.calculateTotalPoints(teamMatches, team.id),
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: this.calculateEfficiency(
        this.calculateTotalPoints(teamMatches, team.id),
        totalGames,
      ),
    };
  }

  private generateAwayTeamMatchesStats(team: any, finishedMatches: any[]) {
    const teamMatches = this.awayMatches(finishedMatches, team.id);
    const totalGames = teamMatches.length;
    const totalVictories = this.calculateTotalVictories(teamMatches, team.id);
    const totalDraws = this.calculateTotalDraws(teamMatches);
    const goalsFavor = this.calculateGoalsFavor(teamMatches, team.id);
    const goalsOwn = this.calculateGoalsOwn(teamMatches, team.id);
    const goalsBalance = goalsFavor - goalsOwn;

    return {
      name: team.teamName,
      totalPoints: this.calculateTotalPoints(teamMatches, team.id),
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: this.calculateEfficiency(
        this.calculateTotalPoints(teamMatches, team.id),
        totalGames,
      ),
    };
  }

  private getTeamMatches = (matches: any[], teamId: number): any[] =>
    matches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );

  private homeMatches = (matches: any[], teamId: number): any[] =>
    matches.filter(
      (match) => match.homeTeamId === teamId,
    );

  private awayMatches = (matches: any[], teamId: number): any[] =>
    matches.filter(
      (match) => match.awayTeamId === teamId,
    );

  private calculateTotalPoints = (matches: any[], teamId: number): number =>
    matches.reduce((total, match) => {
      if (match.homeTeamId === teamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          return total + 3;
        } if (match.homeTeamGoals === match.awayTeamGoals) {
          return total + 1;
        }
      } else if (match.awayTeamId === teamId) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          return total + 3;
        } if (match.awayTeamGoals === match.homeTeamGoals) {
          return total + 1;
        }
      }
      return total;
    }, 0);

  private calculateTotalVictories = (matches: any[], teamId: number): number =>
    matches.reduce((total, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      } if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

  private calculateTotalDraws = (matches: any[]): number =>
    matches.reduce((total, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

  private calculateGoalsFavor = (matches: any[], teamId: number): number =>
    matches.reduce((total, match) => {
      if (match.homeTeamId === teamId) {
        return total + match.homeTeamGoals;
      } if (match.awayTeamId === teamId) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);

  private calculateGoalsOwn = (matches: any[], teamId: number): number =>
    matches.reduce((total, match) => {
      if (match.homeTeamId === teamId) {
        return total + match.awayTeamGoals;
      } if (match.awayTeamId === teamId) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);

  private calculateEfficiency = (totalPoints: number, totalGames: number): number => {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return Number(efficiency.toFixed(2));
  };

  private sortTeamStats = (teamStatistics: any[]): any[] =>
    teamStatistics.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      } if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      } if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      return teamB.goalsFavor - teamA.goalsFavor;
    });
}

export default LeaderboardService;
