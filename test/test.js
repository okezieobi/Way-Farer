import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import pool from '../api/src/db/pgConnect';
import seeder from '../api/src/seeders/seeder';
import token from '../api/src/helpers/jwt';

export default class Test {
  static deleteData() {
    const deleteData = seeder.deleteAll;
    return deleteData;
  }

  static users() {
    const userData = seeder.users.insertData;
    return userData;
  }

  static accounts() {
    const accountsData = seeder.accounts.insertData;
    return accountsData;
  }

  static transactions() {
    const transactionData = seeder.transactions.insertData;
    return transactionData;
  }

  static generateToken(id) {
    const newToken = token.generate(id);
    return newToken;
  }
}

require('./users/signup');

export {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
};
