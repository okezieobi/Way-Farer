import userRouter from './users';
import busRouter from './buses';
import tripRouter from './trips';
import bookingRouter from './bookings';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, busRouter);
  app.use(versionNumber, tripRouter);
  app.use(versionNumber, bookingRouter);
};
