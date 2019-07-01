import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default class Token {
  static generate(id) {
    return jwt.sign({
      userId: id,
    }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}
