export interface BridgeListItem {
  id: string;
  name: string;
  region: string;
}

export interface BridgeListApiResponse {
  count: number;
  bridges: BridgeListItem[]
}

/**
 * Format of all bridge details
 */
export interface BridgeDetails {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  staticimg: string | null;
  liveimg: string | null;
  'bridge_type': string | null;
  'short_name': string | null;
  status: 'Up' | 'Down' | 'Unknown';
}

/**
 * Format of the resulting API response sent to users
 */
export interface BridgeDetailsApiResponse {
  LastUpdate: number;
  count: number;
  bridges: BridgeDetails[];
}

/**
 * Formate of the data coming from the database
 */
export interface BridgeDetailsDbResponse {
  id: number;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  staticimg: string | null;
  liveimg: string | null;
  externalapi_id: string;
  apiprovider: string;
  'bridge_type': string | null;
  'short_name': string | null;
  'can_trust': boolean;
}
