import request from "../../utils/request";
export function Getdining_room() {
    return request.get("/dining_room/listAll")
}