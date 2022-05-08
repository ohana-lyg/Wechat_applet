import { CommentList } from "../types/types";
import { Delete } from "./index";
import { get } from "./index.ts";

export const getComment = (data: CommentList): Promise<any> => {
  return get("/comment/listAll", data);
};
export const deleteComment = (data: any): Promise<any> => {
  //console.log(data);
  return Delete("/comment/delete", data);
};
