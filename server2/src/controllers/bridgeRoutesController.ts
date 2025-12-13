import { Request, Response } from 'express';
import { getPool } from '@/utilities/pgDatabase';
import { QueryResult } from 'pg';
import { BridgeListItem } from '@/types/bridgeResponseTypes';

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
  
}
