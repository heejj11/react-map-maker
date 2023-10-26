import axios from "axios"
import { DistrictRequest } from "@/types"

export const fetchDistrictData = async (payload: DistrictRequest) => {
  const response = await axios.post("https://dev-api.wooriga.kr/api/web/bizZone/list/district", payload, {
    headers: { "X-Client-Id": "WoOrIgA2021" },
  })
  return response.data
}
