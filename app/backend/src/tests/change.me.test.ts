import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/users';
import { app } from '../app';
import MatchesModel from '../database/models/matches';
import TeamsModel from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Matches', () => {
  let stub: sinon.SinonStub;

  before(() => {
    stub = sinon.stub(MatchesModel, 'findOne');
  });

  after(() => {
    stub.restore();
  });

  it('Testa se a função getAll retorna todas as partidas', async () => {
    const expectedMatches = [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 3,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 5,
        "homeTeamId": 7,
        "homeTeamGoals": 1,
        "awayTeamId": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 6,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 7,
        "homeTeamId": 12,
        "homeTeamGoals": 2,
        "awayTeamId": 6,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 8,
        "homeTeamId": 15,
        "homeTeamGoals": 0,
        "awayTeamId": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 9,
        "homeTeamId": 1,
        "homeTeamGoals": 0,
        "awayTeamId": 12,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 10,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 11,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 12,
        "homeTeamId": 6,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 13,
        "homeTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamId": 5,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 14,
        "homeTeamId": 14,
        "homeTeamGoals": 2,
        "awayTeamId": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 15,
        "homeTeamId": 10,
        "homeTeamGoals": 0,
        "awayTeamId": 15,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 16,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 17,
        "homeTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 18,
        "homeTeamId": 12,
        "homeTeamGoals": 4,
        "awayTeamId": 5,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 19,
        "homeTeamId": 11,
        "homeTeamGoals": 2,
        "awayTeamId": 2,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 20,
        "homeTeamId": 7,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 21,
        "homeTeamId": 6,
        "homeTeamGoals": 3,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 22,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 23,
        "homeTeamId": 15,
        "homeTeamGoals": 2,
        "awayTeamId": 16,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 24,
        "homeTeamId": 10,
        "homeTeamGoals": 2,
        "awayTeamId": 14,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 25,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 26,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 27,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 15,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 28,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 29,
        "homeTeamId": 9,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 4,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 30,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 12,
        "awayTeamGoals": 4,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 31,
        "homeTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamId": 10,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 32,
        "homeTeamId": 14,
        "homeTeamGoals": 5,
        "awayTeamId": 11,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 33,
        "homeTeamId": 1,
        "homeTeamGoals": 1,
        "awayTeamId": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 34,
        "homeTeamId": 9,
        "homeTeamGoals": 3,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 35,
        "homeTeamId": 10,
        "homeTeamGoals": 1,
        "awayTeamId": 5,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 36,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 37,
        "homeTeamId": 15,
        "homeTeamGoals": 0,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 38,
        "homeTeamId": 14,
        "homeTeamGoals": 2,
        "awayTeamId": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 39,
        "homeTeamId": 3,
        "homeTeamGoals": 2,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 40,
        "homeTeamId": 12,
        "homeTeamGoals": 4,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 43,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 10,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 44,
        "homeTeamId": 7,
        "homeTeamGoals": 2,
        "awayTeamId": 15,
        "awayTeamGoals": 2,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 45,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 46,
        "homeTeamId": 4,
        "homeTeamGoals": 1,
        "awayTeamId": 12,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 47,
        "homeTeamId": 8,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 2,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 48,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 2,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      }
    ]
    stub.resolves(expectedMatches);

    const response = await chai.request(app).get('/matches');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedMatches);
  });

  it('Testa se a função getInProgressMatches retorna todas as partidas em andamento', async () => {
    const expectedMatches = [
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 43,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 10,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 44,
        "homeTeamId": 7,
        "homeTeamGoals": 2,
        "awayTeamId": 15,
        "awayTeamGoals": 2,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 45,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 46,
        "homeTeamId": 4,
        "homeTeamGoals": 1,
        "awayTeamId": 12,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 47,
        "homeTeamId": 8,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 2,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 48,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 2,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      }
    ]
    stub.resolves(expectedMatches);

    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedMatches);
  });

  it('Testa se a função getFinishedMatches retorna todas as partidas finalizadas', async () => {
    const expectedMatches = [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 3,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 5,
        "homeTeamId": 7,
        "homeTeamGoals": 1,
        "awayTeamId": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 6,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 7,
        "homeTeamId": 12,
        "homeTeamGoals": 2,
        "awayTeamId": 6,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 8,
        "homeTeamId": 15,
        "homeTeamGoals": 0,
        "awayTeamId": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 9,
        "homeTeamId": 1,
        "homeTeamGoals": 0,
        "awayTeamId": 12,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 10,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 11,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 12,
        "homeTeamId": 6,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 13,
        "homeTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamId": 5,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 14,
        "homeTeamId": 14,
        "homeTeamGoals": 2,
        "awayTeamId": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 15,
        "homeTeamId": 10,
        "homeTeamGoals": 0,
        "awayTeamId": 15,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 16,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 17,
        "homeTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 18,
        "homeTeamId": 12,
        "homeTeamGoals": 4,
        "awayTeamId": 5,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 19,
        "homeTeamId": 11,
        "homeTeamGoals": 2,
        "awayTeamId": 2,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 20,
        "homeTeamId": 7,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 21,
        "homeTeamId": 6,
        "homeTeamGoals": 3,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 22,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
      {
        "id": 23,
        "homeTeamId": 15,
        "homeTeamGoals": 2,
        "awayTeamId": 16,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 24,
        "homeTeamId": 10,
        "homeTeamGoals": 2,
        "awayTeamId": 14,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 25,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 26,
        "homeTeamId": 13,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 27,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 15,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 28,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 29,
        "homeTeamId": 9,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 4,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 30,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 12,
        "awayTeamGoals": 4,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 31,
        "homeTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamId": 10,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Grêmio"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 32,
        "homeTeamId": 14,
        "homeTeamGoals": 5,
        "awayTeamId": 11,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 33,
        "homeTeamId": 1,
        "homeTeamGoals": 1,
        "awayTeamId": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "São Paulo"
        }
      },
      {
        "id": 34,
        "homeTeamId": 9,
        "homeTeamGoals": 3,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 35,
        "homeTeamId": 10,
        "homeTeamGoals": 1,
        "awayTeamId": 5,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Minas Brasília"
        },
        "awayTeam": {
          "teamName": "Cruzeiro"
        }
      },
      {
        "id": 36,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Flamengo"
        }
      },
      {
        "id": 37,
        "homeTeamId": 15,
        "homeTeamGoals": 0,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 38,
        "homeTeamId": 14,
        "homeTeamGoals": 2,
        "awayTeamId": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Santos"
        },
        "awayTeam": {
          "teamName": "Corinthians"
        }
      },
      {
        "id": 39,
        "homeTeamId": 3,
        "homeTeamGoals": 2,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 40,
        "homeTeamId": 12,
        "homeTeamGoals": 4,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }
    ]
    stub.resolves(expectedMatches);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedMatches);
  });

  it('Testa se a função finishMatch retona "Token not found" se o token não existir', async () => {
    const matchId = 1;

    stub.resolves(matchId);

    const response = await chai.request(app).patch(`/matches/${matchId}/finish`);
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token not found');
  });

  /*
  it('', async () => {

    const matchId = 43;

    stub.resolves(matchId);

    const email = 'user@user.com';
    const password = 'secret_user';

    const loginResponse = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body.token).to.not.be.empty;

    const token = loginResponse.body.token;

    const response = await chai
      .request(app)
      .patch(`/matches/${matchId}/finish`)
      .set('Authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Finished');
  });
  */
});

describe('Testes Teams', () => {
  let stub: sinon.SinonStub;

  before(() => {
    stub = sinon.stub(TeamsModel, 'findOne');
  });

  after(() => {
    stub.restore();
  });

  it('getAll should return an array of teams', async () => {
    const expectedTeams = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ];
    sinon.stub(expectedTeams);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedTeams);
  });
});

describe('', () => {
  let usersModelStub: sinon.SinonStub;

  beforeEach(() => {
    usersModelStub = sinon.stub(Users, 'findOne');
  });

  afterEach(() => {
    usersModelStub.restore();
  });

  it('Testa a função findUser', async () => {
    const email = 'user@user.com';
    const password = 'secret_user';

    const response = await chai.request(app).post('/login').send({ email, password });
    console.log(response.body);

    expect(response.body.message).to.equal('Invalid email or password');
    expect(usersModelStub.calledOnceWithExactly({ where: { email } })).to.be.true;
  });
});