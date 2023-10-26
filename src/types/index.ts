export interface DistrictRequest {
  level: number
  neLat: number
  neLng: number
  swLat: number
  swLng: number
}

export interface DistrictResponse {
  allCnt: number
  bjdCode?: string
  districtLevel: number
  districtNm: string
  districtNmSimple: string
  latitude: string
  longitude: string
  maintenanceSmallCnt: number
  reConstructionCnt: number
  reDevelopmentCnt: number
  zoneRoad?: string
  streetHouseCnt: number
  collectHouseCnt?: number
  urbanDevelopmentTransferCnt?: number
  urbanDevelopmentAcquireCnt?: number
  localHouseAssociationCnt?: number
}

export interface MapBounds {
  _max: Bounds
  _min: Bounds
  _ne: Bounds
  _sw: Bounds
}

interface Bounds {
  y: number
  _lat: number
  x: number
  _lng: number
}
