/**
 * Express application for the IsTheBridgeUp API
 * 
 * @author Preston Sia
 */

import cors from 'cors';
import express, {Express} from 'express';

const createApp = (): Express => {
  const app = express();

  // MIDDLEWARE configuration application-wide
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Configure base ROUTES
  // app.use('/', routes);

  return app;
}

export default createApp;
