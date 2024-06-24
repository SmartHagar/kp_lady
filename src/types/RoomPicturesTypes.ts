/** @format */

import RoomsTypes from "./RoomsTypes";

// roomPictures
interface RoomPicturesTypes {
  id: string | number;
  room_id: string | number;
  picture: string;
  room: RoomsTypes;
}

export default RoomPicturesTypes;
