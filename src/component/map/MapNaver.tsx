import React, { useEffect, useRef, useState } from "react"
import ReactDOMServer from "react-dom/server"
import { DistrictResponse, MapBounds } from "@/types"
import { fetchDistrict } from "@/api/api"
import Marker from "@/component/marker/Marker"

const MapNaver = () => {
  const { naver } = window
  const mapRef = useRef<HTMLElement | null | any>(null)
  const markerList = useRef<any[]>([])
  const [myLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 37.4979517,
    longitude: 127.0276188,
  })
  const [currentZoom, setCurrentZoom] = useState<number>(8)
  const [districtList, setDistrictList] = useState<DistrictResponse[]>([])

  useEffect(() => {
    if (!naver || !mapRef) return
    const location = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude)
    const mapOption = {
      center: location,
      zoom: 8,
      minZoom: 7,
      maxZoom: 15,
      zoomControl: true,
    }

    mapRef.current = new naver.maps.Map("map", mapOption)
    mapRef.current.setOptions({
      draggable: true,
      pinchZoom: true,
      scrollWheel: true,
      keyboardShortcuts: true,
    })
    naver.maps.Event.once(mapRef.current, "init", () => {
      mapRef.current.getBounds()
      zoomHandler()
    })
    naver.maps.Event.addListener(mapRef.current, "zoom_changed", (zoom: any) => {
      zoomHandler(zoom)
    })
    naver.maps.Event.addListener(mapRef.current, "dragend", () => {
      zoomHandler(mapRef.current.getZoom())
    })
  }, [])

  useEffect(() => {
    addMarkerHandler()
  }, [districtList])

  const zoomHandler = (zoom?: any) => {
    if (!mapRef.current) return
    const bound: MapBounds = mapRef.current.getBounds()
    if (zoom) setCurrentZoom(zoom)
    const level = zoom < 11 || !zoom ? 1 : 2
    fetchData(level, bound)
  }

  const makeHtml = (district: DistrictResponse) => {
    return ReactDOMServer.renderToString(<Marker district={district} />)
  }

  const addMarkerHandler = () => {
    markerList.current.forEach(e => {
      e.setMap(null)
    })
    districtList.map(district => {
      if (district.allCnt > 0) {
        const newMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(district.latitude, district.longitude),
          map: mapRef.current,
          icon: {
            content: makeHtml(district),
          },
        })
        newMarker.addListener("mouseover", () => {
          newMarker.eventTarget.querySelector(".tooltip").style.display = "flex"
          newMarker.eventTarget.querySelector(".marker").style.zIndex = "100"
        })

        newMarker.addListener("mouseout", () => {
          newMarker.eventTarget.querySelector(".tooltip").style.display = "none"
          newMarker.eventTarget.querySelector(".marker").style.zIndex = "0"
        })

        newMarker.addListener("click", () => {
          if (currentZoom > 15 || currentZoom < 7) return

          const zoom = currentZoom + 3
          mapRef.current.setZoom(zoom)
          const mapLatLng = new naver.maps.LatLng(district.latitude, district.longitude)
          mapRef.current.panTo(mapLatLng)
        })
        markerList.current.push(newMarker)
      }
    })
  }

  const fetchData = async (level: number, bounds: MapBounds | undefined) => {
    if (!bounds) return
    const sw = bounds._sw
    const ne = bounds._ne

    const requestData = {
      level,
      swLat: sw._lat,
      swLng: sw._lng,
      neLat: ne._lat,
      neLng: ne._lng,
    }

    try {
      const res = await fetchDistrict(requestData)
      setDistrictList(res)
    } catch (e) {
      console.error(e)
      setDistrictList([])
    }
  }

  return <div id="map" className="map"></div>
}

export default MapNaver
