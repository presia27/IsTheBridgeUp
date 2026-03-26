import { BridgeDetailsDbResponse } from '@/types/bridgeResponseTypes';

export const bridgeMetadata: BridgeDetailsDbResponse[] = [
  {
    id: '1',
    name: '1st Avenue South',
    region: 'Duwamish',
    latitude: 47.542215205409605,
    longitude: -122.3344640417431,
    staticimg: null,
    liveimg: 'https://images.wsdot.wa.gov/nw/099vc02671.jpg',
    externalapi_id: '1',
    apiprovider: 'sdot',
    bridge_type: 'Bascule',
    short_name: '1st Ave',
    can_trust: true
  },
  {
    id: '3',
    name: 'Lower Spokane Street',
    region: 'Duwamish',
    latitude: 47.571378458873,
    longitude: -122.35354958119821,
    staticimg: null,
    liveimg: 'https://www.seattle.gov/trafficcams/images/11_SW_Spokane_NS.jpg',
    externalapi_id: '6',
    apiprovider: 'sdot',
    bridge_type: 'Swing',
    short_name: 'Spokane St.',
    can_trust: false
  }
];