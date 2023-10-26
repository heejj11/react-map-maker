import React from "react"
import { DistrictResponse } from "@/types"

interface MarkerProps {
  district: DistrictResponse
}

const Marker = ({ district }: MarkerProps) => {
  if (!district) return null
  return (
    <div className="marker-wrapper">
      <div className="marker">
        <div className="district">
          {Number(district.districtLevel) === 1 ? district.districtNmSimple : district.districtNm}
        </div>
        <div className="cnt">{district.allCnt}</div>
      </div>
      <div className="tooltip">
        {district.reDevelopmentCnt > 0 && (
          <div className="tooltip_item">
            <span>재개발</span>
            <span className="tooltip_cnt">{district.reDevelopmentCnt}</span>
          </div>
        )}
        {district.reConstructionCnt > 0 && (
          <div className="tooltip_item">
            <span>재건축</span>
            <span className="tooltip_cnt">{district.reConstructionCnt}</span>
          </div>
        )}
        {district.streetHouseCnt > 0 && (
          <div className="tooltip_item">
            <span>가로주택</span>
            <span className="tooltip_cnt">{district.streetHouseCnt}</span>
          </div>
        )}
        {district.maintenanceSmallCnt > 0 && (
          <div className="tooltip_item">
            <span>소규모재건축</span>
            <span className="tooltip_cnt">{district.maintenanceSmallCnt}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marker
