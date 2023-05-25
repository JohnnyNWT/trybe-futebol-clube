import { Model, INTEGER } from 'sequelize';
import teams from './teams';
import db from '.';

class Matches extends Model {
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
  public homeTeam!: any;
  public awayTeam!: any;

  static association() {
    Matches.belongsTo(teams, {
      foreignKey: 'homeTeamId',
      as: 'homeTeam',
    });

    Matches.belongsTo(teams, {
      foreignKey: 'awayTeamId',
      as: 'awayTeam',
    });
  }
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeamId: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: INTEGER,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

Matches.association();

export default Matches;
