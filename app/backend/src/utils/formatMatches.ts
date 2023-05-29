function formatMatches(match: any) {
  return {
    id: match.id,
    homeTeamId: match.homeTeamId,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamId: match.awayTeamId,
    awayTeamGoals: match.awayTeamGoals,
    inProgress: !!match.inProgress,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
  };
}

export default formatMatches;
