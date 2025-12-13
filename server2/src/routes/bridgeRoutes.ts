/**
 * Bridgte routes - Provides information about draw bridges
 * based on metadata from the database and external city/county/state
 * data.
 */

import { getBridgeList } from '@/controllers/bridgeRoutesController';
import { Router } from 'express';

export const bridgeRoutes = Router();

/**
 * Retrieves metadata for all bridges without detailed status information.
 */
bridgeRoutes.get('/list', getBridgeList);

/**
 * Retrieves complete information for a specific bridge, including current up/down status.
 */
bridgeRoutes.get('/:id');

/**
 * Retrieves complete information for all bridges, including current status for each.
 */
bridgeRoutes.get('/all');
