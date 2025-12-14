import { Request, Response } from 'express';
import { getPool } from '@/utilities/pgDatabase';
import { QueryResult } from 'pg';
import { BridgeDetailsDbResponse, BridgeListItem } from '@/types/bridgeResponseTypes';
import { fillBridgeStatus } from '@/utilities/externalConnectors/sdotConnector';

export async function getBridgeList(req: Request, res: Response) {
  // query strings to use
  const queryString = 'SELECT id, name, region FROM bridges';
  const pool = getPool();

  const bridgeListResult: QueryResult<any> = await pool.query(queryString);
  
  const bridgeListCleaned: BridgeListItem[] = bridgeListResult.rows.map(row => ({
    id: parseInt(row.id),
    name: row.name,
    region: row.region
  }));

  res.json({
    count: bridgeListCleaned.length,
    bridges: bridgeListCleaned
  });
}

export async function getBridgeById(req: Request, res: Response) {
  const requestedId: number = parseInt(req.params.id as string);
  const timetags = req.query.timetags as string;
  const queryString: string = 'SELECT * FROM bridges WHERE id=$1';

  const apiResponseData = await bridgeDataProvider(queryString, timetags, requestedId);

  // Combine, sort, and send back to user agent
  res.send(apiResponseData);
}

export async function getAllBridgeData(req: Request, res: Response) {
  const timetags = req.query.timetags as string;
  const queryString: string = 'SELECT * FROM bridges';

  const apiResponseData = await bridgeDataProvider(queryString, timetags);
  
  res.send(apiResponseData);
}

async function bridgeDataProvider(queryString: string, timetagsParam: string, id?: number) {
  const pool = getPool();

  const sqlparams = [];
  if (id) {
    sqlparams.push(id);
  }

  // Get metadata
  const bridgeDbResult: QueryResult<BridgeDetailsDbResponse> = await pool.query(queryString, sqlparams);

  // Sort all responses by API
  const sdotBridges = bridgeDbResult.rows.filter((b) => b.apiprovider === 'sdot');

  // Call APIs
  const sdotFilledData = await fillBridgeStatus(sdotBridges, timetagsParam === 'true' ? true : false);

  return sdotFilledData;
}
