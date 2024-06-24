/** @format */

import FasitiliesTypes from "@/types/FacilitiesTypes";
/** @format */

// roomFacilites
interface RoomFacilitesTypes {
  id: string | number;
  room_id: string | number;
  facility_id: string | number;
  quantity: string | number;
  facility: FasitiliesTypes[];
}

export default RoomFacilitesTypes;
