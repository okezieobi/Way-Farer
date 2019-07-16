import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || '3000';
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is live and listening on port ${port}!`);
});

export default app;
