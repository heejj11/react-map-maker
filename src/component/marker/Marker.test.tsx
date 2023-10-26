import React from "react"
import { render, screen } from "@testing-library/react"
import Marker from "./Marker"
import { DistrictResponse } from "@/types"

describe("Marker", () => {
  const mockDistrict: DistrictResponse = {
    districtNm: "TestDistrict",
    districtNmSimple: "TD",
    districtLevel: 1,
    allCnt: 100,
    reDevelopmentCnt: 50,
    reConstructionCnt: 30,
    streetHouseCnt: 20,
    maintenanceSmallCnt: 10,
    latitude: "",
    longitude: "",
  }

  it("should not render without district prop", () => {
    // @ts-ignore
    render(<Marker />)
    expect(screen.queryByText("District")).not.toBeInTheDocument()
  })

  it("should render with provided district prop", () => {
    render(<Marker district={mockDistrict} />)
    expect(screen.getByText("TD")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("should render tooltip on district counts", () => {
    render(<Marker district={mockDistrict} />)
    expect(screen.getByText("재개발")).toBeInTheDocument()
    expect(screen.getByText("재건축")).toBeInTheDocument()
    expect(screen.getByText("가로주택")).toBeInTheDocument()
    expect(screen.getByText("소규모재건축")).toBeInTheDocument()
  })
})
