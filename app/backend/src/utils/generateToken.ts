import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'acai';

async function generateToken(payload: object) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
}

export default generateToken;
