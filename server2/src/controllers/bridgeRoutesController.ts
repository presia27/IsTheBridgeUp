import { Request, Response } from 'express';

export async function getBridgeList(req: Request, res: Response) {
  // query strings to use
  const queryString = 'SELECT id, name, region FROM bridges';
  
}