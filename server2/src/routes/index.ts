/**
 * Main Express routes for this server.
 */

import { Router } from "express";

const routes = Router();

routes.get('/', (request, response) => {
  response.json({
    success: true,
    message: 'IsTheBridgeUp API. This message indicates that the service is operational.',
    timestamp: new Date().toISOString(),
    endpoints: {
      
    },
    documentation: "to be added soon..."
  });
});

export default routes;
