/** @format */

import RoomPicturesTypes from "./RoomPicturesTypes";
import RoomTypesTypes from "./RoomTypesTypes";

// rooms
interface RoomsTypes {
  id: string | number;
  room_number: string | number;
  room_type_id: string | number;
  description?: string;
  price: string;
  room_type?: RoomTypesTypes;
  room_picture?: RoomPicturesTypes[];
  room_facility?: RoomPicturesTypes[];
}

export default RoomsTypes;
