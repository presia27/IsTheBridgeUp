import { Request, Response } from 'express';
import { getPool } from '@/utilities/pgDatabase';
import { QueryResult, QueryResultRow } from 'pg';
import { BridgeDetails, BridgeDetailsDbResponse, BridgeListItem } from '@/types/bridgeResponseTypes';
import { fillBridgeStatus } from '@/utilities/externalConnectors/sdotConnector';

export async function getBridgeList(req: Request, res: Response) {
  // query strings to use
  const queryString = 'SELECT id, name, region FROM bridges';
  const pool = getPool();

  const bridgeListResult: QueryResult<BridgeListItem> = await pool.query(queryString);
  
  const bridgeListCleaned: BridgeListItem[] = bridgeListResult.rows.map(row => ({
    id: row.id,
    name: row.name,
    region: row.region
  }))

  res.json({
    count: bridgeListCleaned.length,
    bridges: bridgeListCleaned
  });
}

export async function getBridgeById(req: Request, res: Response) {
  const requestedId: number = parseInt(req.params.id as string);
  const timetags = req.query.timetags;
  const queryString: string = 'SELECT * FROM bridges WHERE id=$1';

  const pool = getPool();

  // Get metadata
  const bridgeDbResult: QueryResult<BridgeDetailsDbResponse> = await pool.query(queryString, [requestedId]);

  // Sort all responses by API
  const sdotBridges = bridgeDbResult.rows.filter((b) => b.apiprovider === 'sdot');
  
  // Call APIs
  const sdotFilledData = fillBridgeStatus(sdotBridges, timetags === 'true' ? true : false);

  // Combine, sort, and send back to user agent
  
}
