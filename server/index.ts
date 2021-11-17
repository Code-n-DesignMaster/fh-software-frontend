import next from 'next';
import express from 'express';
import routes from './routes';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const expressApp = express();
  expressApp.use(handler).listen(port);

  // tslint:disable-next-line:no-console
  // eslint-disable-next-line no-console
  console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
})
  .catch((e) => {
  // tslint:disable-next-line:no-console
    // eslint-disable-next-line no-console
    console.log('Something went wrong: ', e);
    process.exit();
  });
