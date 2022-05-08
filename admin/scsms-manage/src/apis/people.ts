import { PeopleList } from "../types/types";
import { Delete } from "./index";
import { get } from "./index.ts";

export const getPeople = (data: PeopleList): Promise<any> => {
  return get("/user/listAll", data);
};
export const deletePeople = (data: any): Promise<any> => {
  //console.log(data);
  return Delete("/user/delete", data);
};
