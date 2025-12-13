export interface BridgeListItem {
  id: string;
  name: string;
  region: string;
}

export interface BridgeListApiResponse {
  count: number;
  bridges: BridgeListItem[]
}
