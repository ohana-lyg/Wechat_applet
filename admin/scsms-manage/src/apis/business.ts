import { BusinessList } from "../types/types";
import { Delete, post } from "./index";
import { get } from "./index.ts";

export const getBusiness = (data: BusinessList): Promise<any> => {
  return get("/business/listAll", data);
};

export const updateBusiness = (data: BusinessList): Promise<any> => {
  return post("/business/update", data);
};

export const auditBusiness = (auditInfo: BusinessList): Promise<any> => {
  return Delete("/business/delete", auditInfo);
};
