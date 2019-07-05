import userRouter from './users';
import busRouter from './buses';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, busRouter);
};
