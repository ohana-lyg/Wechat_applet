import { AuditInfo, OrderList } from "../types/types";
import { Delete } from "./index";
import { get } from "./index.ts";

export const getOrder = (data: OrderList): Promise<any> => {
  return get("/order/listAll", data);
};

export const auditOrder = (auditInfo: AuditInfo): Promise<any> => {
  return Delete("/order/delete", auditInfo);
};
